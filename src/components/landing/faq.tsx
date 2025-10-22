import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GITHUB_REPO_URL } from "@/constants";

const faqs = [
  {
    questionEn: "What is HSWLP:Dev Hub?",
    questionHu: "Mi az a HSWLP:Dev Hub?",
    answerEn: (
      <>
        <p>
          HSWLP:Dev Hub is a collaborative community space where developers share knowledge, publish project updates, and find like-minded teammates for experiments across web, game, data, and emerging tech.
        </p>
        <p>
          The platform is built on a modern Cloudflare-first stack so we can deliver fast conversations, resource libraries, and event planning tools without compromising on openness.
        </p>
      </>
    ),
    answerHu: (
      <div lang="hu">
        <p>
          A HSWLP:Dev Hub egy együttműködésre épülő közösségi tér, ahol a fejlesztők tudást osztanak meg, projektfrissítéseket publikálnak, és hasonló érdeklődésű csapattársakat találnak webes, játékos, adat- és feltörekvő technológiás kísérleteikhez.
        </p>
        <p>
          A felület modern, Cloudflare-központú stackre épül, így gyors beszélgetéseket, erőforrás-gyűjteményeket és eseményszervező eszközöket kínálunk az átláthatóság feladása nélkül.
        </p>
      </div>
    ),
  },
  {
    questionEn: "How does bilingual support work?",
    questionHu: "Hogyan működik a kétnyelvű támogatás?",
    answerEn: (
      <>
        <p>
          Posts, project pages, and navigation can all be authored in English and Hungarian simultaneously. Editors can pair translations, add glossary hints, and highlight localized community chapters.
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Language-aware search keeps bilingual content discoverable.</li>
          <li>Accessibility tooling ensures both audiences receive equal-quality experiences.</li>
        </ul>
      </>
    ),
    answerHu: (
      <div lang="hu">
        <p>
          A bejegyzések, projektoldalak és a navigáció egyszerre készíthető angolul és magyarul. A szerkesztők összepárosíthatják a fordításokat, szójegyzékeket adhatnak meg, és kiemelhetik a lokalizált közösségi csoportokat.
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>A nyelvérzékeny kereső gondoskodik a kétnyelvű tartalmak megtalálhatóságáról.</li>
          <li>Az akadálymentesítési eszközök biztosítják, hogy mindkét közönség azonos minőségű élményt kapjon.</li>
        </ul>
      </div>
    ),
  },
  {
    questionEn: "How can I promote my projects?",
    questionHu: "Hogyan reklámozhatom a projektjeimet?",
    answerEn: (
      <>
        <p>
          Every creator gets an interactive portfolio with release timelines, media embeds, GitHub activity summaries, and call-to-action banners for hiring, beta sign-ups, or sponsorships.
        </p>
        <p>
          Tag projects across disciplines, cross-post to circles, and feature community feedback directly on the page.
        </p>
      </>
    ),
    answerHu: (
      <div lang="hu">
        <p>
          Minden alkotó interaktív portfóliót kap kiadási idővonallal, média-beágyazásokkal, GitHub aktivitási összegzéssel és cselekvésre ösztönző bannerekkel álláskereséshez, béta jelentkezéshez vagy támogatókhoz.
        </p>
        <p>
          Címkézd a projektjeidet több szakterületen, oszd meg a műhelyekben, és jelenítsd meg közvetlenül az oldalon a közösségi visszajelzéseket.
        </p>
      </div>
    ),
  },
  {
    questionEn: "What development packages are planned?",
    questionHu: "Milyen fejlesztési csomagok vannak tervben?",
    answerEn: (
      <>
        <p>
          We are preparing modular package bundles so you can switch features on as your community grows:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>
            <strong>Launchpad Essentials</strong> – onboarding flows, profile builder, and editorial calendar for new hubs.
          </li>
          <li>
            <strong>Mentor Network</strong> – matchmaking, goal tracking, and recognition badges.
          </li>
          <li>
            <strong>Community Insights</strong> – analytics dashboards, satisfaction surveys, and automated retrospectives.
          </li>
        </ul>
      </>
    ),
    answerHu: (
      <div lang="hu">
        <p>
          Moduláris fejlesztési csomagokat készítünk, hogy a közösség növekedésével fokozatosan kapcsolhasd be a funkciókat:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>
            <strong>Launchpad Essentials</strong> – beléptetési folyamatok, profilépítő és szerkesztőségi naptár új közösségeknek.
          </li>
          <li>
            <strong>Mentor Network</strong> – összepárosítás, célkövetés és elismerő jelvények.
          </li>
          <li>
            <strong>Community Insights</strong> – analitikai dashboardok, elégedettségi kérdőívek és automatizált retrospektívek.
          </li>
        </ul>
      </div>
    ),
  },
  {
    questionEn: "How can I contribute or help shape the roadmap?",
    questionHu: "Hogyan járulhatok hozzá, vagy segíthetek az ütemterv alakításában?",
    answerEn: (
      <>
        <p>
          We welcome contributions in multiple forms:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Open issues, share design proposals, or submit pull requests on our <a href={GITHUB_REPO_URL} target="_blank" rel="noreferrer">GitHub repository</a>.</li>
          <li>Host local meetups and report back community needs through the ambassador channel.</li>
          <li>Help translate documentation and onboarding guides.</li>
        </ul>
      </>
    ),
    answerHu: (
      <div lang="hu">
        <p>
          Többféleképpen is hozzájárulhatsz:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Nyiss hibajegyet, ossz meg dizájnjavaslatot vagy küldj pull requestet a <a href={GITHUB_REPO_URL} target="_blank" rel="noreferrer">GitHub repóban</a>.</li>
          <li>Szervezz helyi találkozókat, és jelezd vissza a közösség igényeit a nagyköveti csatornán.</li>
          <li>Segíts a dokumentáció és az onboarding anyagok fordításában.</li>
        </ul>
      </div>
    ),
  },
  {
    questionEn: "Which tools integrate with the hub?",
    questionHu: "Milyen eszközök integrálhatók a hubbal?",
    answerEn: (
      <>
        <p>
          Integrations are baked in from day one so teams can automate updates:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>GitHub, GitLab, and Bitbucket activity feeds.</li>
          <li>Package registry badges for npm, PyPI, Cargo, and more.</li>
          <li>CI status cards and deployment recipes via GitHub Actions or other providers.</li>
        </ul>
      </>
    ),
    answerHu: (
      <div lang="hu">
        <p>
          Az integrációk az első naptól kezdve rendelkezésre állnak az automatizált frissítésekhez:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>GitHub-, GitLab- és Bitbucket-aktivitás feedek.</li>
          <li>Csomagtár jelvények az npm, PyPI, Cargo és további rendszerek számára.</li>
          <li>CI-státusz kártyák és telepítési receptek GitHub Actions vagy más szolgáltatók segítségével.</li>
        </ul>
      </div>
    ),
  },
];

export function FAQ() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10 dark:divide-gray-100/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight">
            Frequently asked questions · Gyakran ismételt kérdések
          </h2>
          <Accordion type="single" collapsible className="w-full mt-10">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  <div>
                    <span>{faq.questionEn}</span>
                    <span className="block text-sm text-muted-foreground" lang="hu">
                      {faq.questionHu}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="prose dark:prose-invert w-full max-w-none">
                    <div className="space-y-4">
                      <div>{faq.answerEn}</div>
                      <div className="border-t border-border/60 pt-4" lang="hu">
                        {faq.answerHu}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
