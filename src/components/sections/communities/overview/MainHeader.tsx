
//@ts-nocheck
import Section from "@/components/ui/Section";
import { useSelector } from "@/hooks/useTypedSelector";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { ReactElement } from "react";

const celoCommunity: Community = {
  id: "celo",
  ref: "community-celo",
  created_at: new Date(),
  updated_at: new Date(),
  summary: "Aprender a montar una plantilla de MiniPay de manera sencilla en Español.",
  icon: "https://cms.solow.io/wp-content/uploads/2024/03/InjXBNx9_400x400.jpg",
  image: "https://cms.solow.io/wp-content/uploads/2024/03/InjXBNx9_400x400.jpg",
  name: "Celo en Español",
  slug: "celo",
  active: true,
  description: "Empowering mobile-first DeFi on an EVM-compatible blockchain.",
  colors: {
    text: "#000000",
    textAccent: "#4d4d00",
    accent: "#333300",
    primary: "#fcfe51",
    secondary: "#f7f98e",
    highlight: "#ffffc2",
    muted: "#e6e68a",
    cover: {
      background: "#fcfe51",
      text: "#000000",
      primary: "#fcfe51",
      accent: "#333300",
    },
  },
  metadata: {
    id: "meta-celo",
    ref: "meta-celo",
    created_at: new Date(),
    updated_at: new Date(),
    visibility: "public",
    position: 1,
    locale: "en",
    title: "Celo Community",
    summary: "Join the Celo community and build the future of mobile-first DeFi.",
    tags: ["DeFi", "Mobile", "Blockchain"],
    type: "ecosystem",
    image: "https://cms.solow.io/wp-content/uploads/2024/03/InjXBNx9_400x400.jpg",
    timestamp: Date.now(),
  },
  timestamp: Date.now(),
  rewards: [],
  reward: {
    id: "reward-celo-001",
    ref: "submission-reward-celo",
    created_at: new Date(),
    updated_at: new Date(),
    challenge: "challenge-celo-001",
    type: "SUBMISSION",
    community: "celo",
    token: "CELO",
    stable: false,
    amount: 50,
    timestamp: Date.now(),
    fiatCurrency: "USD",
    distribution: undefined,
  },
  courses: 2,
  challenges: 1,
  duration: 7,
  can_mint_certificates: true,
};


/**
 * Represents the Community Section
 * @date 4/13/2023 - 5:56:41 AM
 *
 * @export
 * @returns {ReactElement}
 */
export default function CommunitySection(): ReactElement {
  const { t } = useTranslation();
  const community = celoCommunity;
  const submissions = community?.metadata?.submissions || 0;
  const feedbacks = community?.metadata?.feedbacks || 0;

  return (
    <Section className="bg-theme-primary text-theme-text">
      <div className="py-2 md:py-8 mx-auto">
        <div className="flex flex-col justify-between lg:flex-row">
          <div className="max-w-md mb-4 md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl lg:mr-6">
            <h1 className="text-5xl leading-10 sm:text-6.5xl xl:text-7.75xl max-w-text-xs -tracking-4">{community?.name}</h1>
            <p className="mt-8 text-lg leading-5.5 lg:hidden">{community?.summary}</p>
            <p className="hidden mt-4 text-lg leading-6 font-extralight lg:block">{community?.summary}</p>
          </div>
          <div className="self-end w-36 md:h-82 lg:h-128 md:w-1/2 max-w-lg">
            {community?.icon && <Image src={`${community?.icon}`} alt={community?.name || ""} className="relative w-full h-full" width={300} height={300} />}
          </div>
        </div>
        <div className="flex flex-col max-w-xs mt-0 sm:-mt-15 lg:-mt-8 md:max-w-xl lg:flex-row lg:items-center">
          {/* <div className="my-2 text-sm">
            <span>
              <strong>{submissions} </strong>
              {t("communities.submissions")}
            </span>
            <span className="p-2 md:border-l md:ml-2">
              <strong>{feedbacks} </strong>
              {t("communities.feedbacks")}
            </span>
            <div />
          </div> */}
        </div>
      </div>
    </Section>
  );
}
