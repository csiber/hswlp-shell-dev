import {
  CloudIcon,
  BoltIcon,
  ShieldCheckIcon,
  RocketLaunchIcon,
  CommandLineIcon,
  SunIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    nameEn: "Open knowledge streams",
    nameHu: "Nyílt tudásfolyamok",
    descriptionEn:
      "Curated discussions, blog-style entries, and quick tips to keep the community inspired and informed.",
    descriptionHu:
      "Kurált beszélgetések, blogbejegyzések és villámtippek, hogy a közösség mindig inspirált és naprakész legyen.",
    icon: CommandLineIcon,
  },
  {
    nameEn: "Showcase-ready portfolios",
    nameHu: "Azonnal bemutatható portfóliók",
    descriptionEn:
      "Rich project pages for web, game, mobile, or experimental work with media embeds and release notes.",
    descriptionHu:
      "Látványos projektoldalak webes, játékos, mobilos vagy kísérleti munkákhoz, médiabeágyazásokkal és kiadási jegyzetekkel.",
    icon: RocketLaunchIcon,
  },
  {
    nameEn: "Mentorship pathways",
    nameHu: "Mentorprogram-útvonalak",
    descriptionEn:
      "Match mentors and mentees, track goals, and celebrate milestones with automated check-ins.",
    descriptionHu:
      "Mentorok és mentoráltak összekötése, célok követése és mérföldkövek ünneplése automatizált bejelentkezésekkel.",
    icon: ShieldCheckIcon,
  },
  {
    nameEn: "Collaborative spaces",
    nameHu: "Közösségi műhelyek",
    descriptionEn:
      "Spin up topic-based circles for AI, frontend, devops, or game jams with shared resources and task boards.",
    descriptionHu:
      "Hozz létre témaspecifikus köreket AI, frontend, devops vagy game jam témákban, közös erőforrásokkal és feladatlistákkal.",
    icon: CloudIcon,
  },
  {
    nameEn: "Inclusive localization",
    nameHu: "Inkluzív lokalizáció",
    descriptionEn:
      "Dual-language interface, glossary tools, and community translation workflows for regional chapters.",
    descriptionHu:
      "Kétnyelvű felület, szójegyzékek és közösségi fordítási folyamatok a regionális közösségeknek.",
    icon: SunIcon,
  },
  {
    nameEn: "Secure collaboration",
    nameHu: "Biztonságos együttműködés",
    descriptionEn:
      "Granular role controls, moderation dashboards, and audit trails to keep conversations constructive.",
    descriptionHu:
      "Részletes jogosultságkezelés, moderátori vezérlők és naplózás a konstruktív beszélgetésekért.",
    icon: ShieldCheckIcon,
  },
  {
    nameEn: "Automated dev workflows",
    nameHu: "Automatizált fejlesztői folyamatok",
    descriptionEn:
      "Integrate GitHub, package registries, CI previews, and deployment recipes to launch faster together.",
    descriptionHu:
      "Integráld a GitHubot, csomagtárakat, CI-előnézeteket és telepítési recepteket a gyorsabb közös induláshoz.",
    icon: BoltIcon,
  },
];

export function Features() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">
            Built for collaborative developer communities · Közösségi fejlesztőknek tervezve
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Foundations that grow with your crew
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Launch conversations, organize meetups, and share releases without leaving the platform.
          </p>
          <p className="mt-3 text-base leading-7 text-muted-foreground" lang="hu">
            Indíts beszélgetéseket, szervezz találkozókat és ossz meg kiadásokat anélkül, hogy kilépnél a felületről.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.nameEn} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                  <feature.icon
                    className="h-5 w-5 flex-none text-indigo-600 dark:text-indigo-400"
                    aria-hidden="true"
                  />
                  <span>
                    {feature.nameEn}
                    <span className="block text-sm font-normal text-muted-foreground" lang="hu">
                      {feature.nameHu}
                    </span>
                  </span>
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.descriptionEn}</p>
                  <p className="mt-2 flex-auto text-sm" lang="hu">
                    {feature.descriptionHu}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
