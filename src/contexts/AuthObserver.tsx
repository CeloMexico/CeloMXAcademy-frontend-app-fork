import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useSelector } from "@/hooks/useTypedSelector";

import { fetchUser } from "@/store/services/user.service";
import { getToken } from "@/store/feature/user.slice";
import { setAuthData, setIsAuthLoading } from "@/store/feature/auth.slice";
import { clearError } from "@/store/feature/index.slice";
import { fetchUserProfile } from "@/store/services/profile/users.service";
import { fetchAllProfileCommunities } from "@/store/services/profile/profileCommunities.service";
import { setListProfileCommunities } from "@/store/feature/profile/communities.slice";
import Loader from "@/components/ui/Loader";
import { AUTH_TOKEN } from "@/constants/localStorage";

// ✳️ Safe mock wrapper
let onAuthStateChangedSafe = (_auth: any, cb: (user: any) => void) => {
  console.warn("Firebase not configured: using mock onAuthStateChanged");
  cb(null);
};
let onIdTokenChangedSafe = (_auth: any, cb: (user: any) => void) => {
  console.warn("Firebase not configured: using mock onIdTokenChanged");
  cb(null);
};
let auth: any = null;

try {
  // @ts-ignore
  const { auth: realAuth } = require("@/config/firebase");
  // @ts-ignore
  const { onAuthStateChanged, onIdTokenChanged } = require("firebase/auth");
  auth = realAuth;
  onAuthStateChangedSafe = onAuthStateChanged;
  onIdTokenChangedSafe = onIdTokenChanged;
} catch (err) {
  console.warn("Firebase not available, running without auth observer.");
}

const UserAuthContext = createContext(null);

export default function AuthObserver({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const route = router.asPath;
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.data);

  const matchesRoutes = (path: string, routes: string[]) =>
    routes?.some((route) => path === route);

  const isUserRoute = useMemo(
    () => (path: string) =>
      path.startsWith("/bounties/") ||
      matchesRoutes(path, [
        "/bounties",
        "/profile",
        "/profile/wallets",
        "/profile/referrals",
        "/profile/settings",
        "/profile/notifications",
      ]),
    []
  );

  const isGuestRoute = useMemo(
    () => (path: string) =>
      matchesRoutes(path, ["/signup", "/password-reset"]),
    []
  );

  const emailVerificationChecker = useCallback(
    async (authUser: any) => {
      if (route.startsWith("/verify-email")) return;
      if (route.startsWith("/email-verification") && !authUser) {
        await router.push("/");
        return;
      }
      if (authUser && !authUser.emailVerified && !route.startsWith("/email-verification")) {
        await router.replace("/email-verification");
        return;
      }
    },
    [route, router]
  );

  const guestAndUserRoutesChecker = useCallback(
    async (authUser: any) => {
      if (authUser && isGuestRoute(route)) {
        await router.replace("/");
        return;
      }

      if (!authUser && isUserRoute(route)) {
        await router.replace("/login");
        return;
      }

      if (route.startsWith("/profile") && authUser && authUser.emailVerified) {
        const username = (router.query.username as string) || user?.username || "";
        if (username) {
          dispatch(fetchUserProfile(username));
          dispatch(fetchAllProfileCommunities(authUser?.displayName || ""));
        }
      }

      if (route.startsWith("/profile")) {
        const { data } = await dispatch(fetchAllProfileCommunities((router.query?.username || authUser?.displayName) as string));
        dispatch(setListProfileCommunities(data));
      }
    },
    [dispatch, isGuestRoute, isUserRoute, route, router]
  );

  // useEffect(() => {
  //   // Mock-safe token and auth listeners
  //   onIdTokenChangedSafe(auth, async (authUser) => {
  //     dispatch(setAuthData(authUser?.toJSON?.() || null));
  //     const token = (await authUser?.getIdToken?.()) ?? "";
  //     if (token) localStorage.setItem(AUTH_TOKEN, token);
  //     await dispatch(getToken());
  //   });

  //   onAuthStateChangedSafe(auth, async (authUser) => {
  //     setLoading(true);
  //     dispatch(setIsAuthLoading(true));
  //     await emailVerificationChecker(authUser);
  //     await guestAndUserRoutesChecker(authUser);
  //     dispatch(setAuthData(authUser?.toJSON?.() || null));
  //     await dispatch(fetchUser());
  //     setLoading(false);
  //     dispatch(setIsAuthLoading(false));
  //   });
  // }, [dispatch, emailVerificationChecker, guestAndUserRoutesChecker]);

  useEffect(() => {
    dispatch(clearError());
  }, [router.pathname]);

  if (loading && !user && (isGuestRoute(route) || isUserRoute(route))) {
    return (
      <div className="fixed h-screen w-screen overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 h-full w-full -translate-y-1/2 z-999 flex items-center justify-center bg-white">
          <Loader />
        </div>
      </div>
    );
  }

  return <UserAuthContext.Provider value={null}>{children}</UserAuthContext.Provider>;
}
