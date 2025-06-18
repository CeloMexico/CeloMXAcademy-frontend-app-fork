//@ts-nocheck
import { ReactElement } from "react";
import Section from "@/components/ui/Section";
import CommunityCard from "@/components/cards/community";
import PartneringCard from "@/components/cards/Partnering";
import { useTranslation } from "next-i18next";
import { Community } from "@/types/community";


export const communitiesArray: Community[] = [
  {
    id: "celo",
    ref: "community-celo",
    created_at: new Date(),
    updated_at: new Date(),
    summary: "A mobile-first, carbon-negative blockchain supporting global payments and DeFi.",
    icon: "https://cms.solow.io/wp-content/uploads/2024/03/InjXBNx9_400x400.jpg",
    image: "https://cms.solow.io/wp-content/uploads/2024/03/InjXBNx9_400x400.jpg",
    name: "Celo",
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
    rewards: [
      {
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
    ],
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
    challenges: 4,
    duration: 7, // in days
    can_mint_certificates: true,
    items: [],
    challenge: undefined,
    submission: undefined,
  },
];



/**
 *  Communities section component props
 * @date 4/10/2023 - 7:31:44 AM
 *
 * @export
 * @param {{
  communities: Community[];
}} {
  communities,
}
 * @returns {ReactElement}
 */

export default function CommunitiesSection({ communities, testId = "communitiesSectionId" }: { communities: Community[]; testId?: string }): ReactElement {
  const { t } = useTranslation();
  console.log("communities", communities)
  return (
    <Section type="default" padding="pt-20 lg:pb-24 md:pb-24">
      <div data-testid={testId} id="communities" className="md:flex relative items-end">
        <div className="pr-5">
          <p className="uppercase font-bold text-xs leading-3.3 tracking-3 text-primary">{t("page.index.communities.title")}</p>
        </div>
        <div className="pl-7 relative hidden lg:block md:block">
          <div className="message-bubble">{t("page.index.communities.subtitle")}</div>
        </div>
      </div>
      <div className="mt-5 md:mt-7 grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2 lg:gap-y-6 md:gap-y-5 justify-stretch-items">
        {communitiesArray?.map((community) => (
          <CommunityCard key={community.id} community={community} />
        ))}
        {/* <PartneringCard /> */}
      </div>
    </Section>
  );
}
