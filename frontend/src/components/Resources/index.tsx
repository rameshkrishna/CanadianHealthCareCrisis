import Image from "next/image";
interface SectionProps {
  title: string;
  links: { url: string; text: string }[];
}

const Section = ({ title, links }: SectionProps) => (
  <div className="mb-8">
    <h2 className="mb-4 text-2xl font-semibold">{title}</h2>
    <ul className="space-y-2">
      {links.map((link, index) => (
        <li key={index}>
          <a
            href={link.url}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.text}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const Resources = () => {
  return (
    <section
      id="Resources"
      className="bg-gray-1 pb-8 pt-20 dark:bg-dark-2 lg:pb-[70px] lg:pt-[120px]"
    >
      <div className="container">
        <div className="wow fadeInUp" data-wow-delay=".2s">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="mx-auto max-w-4xl">
              <h1 className="mb-6 text-3xl font-bold">
                Canadian Health Care Resources
              </h1>

              <Section
                title="Capital Gains Tax"
                links={[
                  {
                    text: "Doctors ask Liberal government to reconsider capital gains tax change",
                    url: "https://vancouver.citynews.ca/2024/04/23/doctors-ask-liberal-government-to-reconsider-capital-gains-tax-change",
                  },
                  {
                    text: "How capital gains tax changes could affect some family doctors",
                    url: "https://globalnews.ca/news/10435179/captial-gains-budget-2024-family-doctors",
                  },
                  {
                    text: "Capital gains changes are ‘really fair,’ Freeland says, as doctors cry foul",
                    url: "https://globalnews.ca/news/10443557/capital-gains-tax-budget-2024-cma/",
                  },
                ]}
              />

              <Section
                title="Hospital and ER Wait Times"
                links={[
                  {
                    text: "Why Are Hospital Wait Times in Canada So Long? | Qminder",
                    url: "https://www.qminder.com/blog/queue-management/canada-long-hospital-wait-times/",
                  },
                  {
                    text: "Canadian ER doctor says wait times are the 'worst it's ever been'",
                    url: "https://toronto.citynews.ca/2024/01/09/canadian-er-doctor-says-wait-times-are-the-worst-its-ever-been/",
                  },
                  {
                    text: "Ontario government to spend $21B less to fund health care: FAO",
                    url: "https://toronto.citynews.ca/2023/03/08/ontario-health-care-spending-doug-ford-hospitals-long-term-care/",
                  },
                  {
                    text: "20-hour waits: Canadian doctors group reports overflowing emergency rooms",
                    url: "https://www.ctvnews.ca/health/20-hour-waits-canadian-doctors-group-reports-overflowing-emergency-rooms-1.6721176",
                  },
                  {
                    text: "‘Waiting 20 hours’: Overwhelmed ERs causing patients to suffer, CMA says",
                    url: "https://globalnews.ca/news/10218446/canada-emergency-rooms-overwhelmed-cma/",
                  },
                  {
                    text: "Winnipeg health authority launches review into patient's death in Grace Hospital hallway after 33-hour ER wait | CBC News",
                    url: "https://www.cbc.ca/news/canada/manitoba/patient-death-grace-hospital-er-hallway-review-1.7036251",
                  },
                  {
                    text: "How Canadian hospitals grew dependent on expensive out-of-town nurses",
                    url: "https://www.theglobeandmail.com/canada/article-how-canadian-hospitals-grew-dependent-on-expensive-out-of-town-nurses/",
                  },
                ]}
              />

              <Section
                title="Health Care System Challenges"
                links={[
                  {
                    text: "Private health-care a growing concern in Canada",
                    url: "https://www.ctvnews.ca/mobile/health/why-some-worry-Resources-the-rise-of-private-agency-health-care-staffing-firms-in-canada-1.6600637?cache=/7.300759",
                  },
                  {
                    text: "Our health-care system is crashing",
                    url: "https://www.nationalobserver.com/2024/01/25/opinion/our-health-system-crashing",
                  },
                  {
                    text: "Canada’s health care crunch has become ‘horrific and inhumane,’ doctors warn",
                    url: "https://globalnews.ca/news/10224314/canada-healthcare-emergency-room-crisis/",
                  },
                  {
                    text: "Canada's health-care crisis was 'decades in the making,' says CMA",
                    url: "https://www.ctvnews.ca/health/canada-s-health-care-crisis-was-decades-in-the-making-says-cma-1.6849408",
                  },
                  {
                    text: "Canadians have little faith health-care system will improve soon: poll",
                    url: "https://globalnews.ca/news/10246816/health-care-canada-leger-poll/",
                  },
                  {
                    text: "Improve public health care rather than explore private alternatives, say patient advocates | CBC News",
                    url: "https://www.cbc.ca/news/canada/nova-scotia/canadian-medical-association-halifax-patient-advocates-1.7144819",
                  },
                  {
                    text: "Family of man who died after waiting hours in ER for urgent care want nurses held accountable | CBC News",
                    url: "https://www.cbc.ca/news/canada/montreal/akeem-scott-died-family-crarr-1.6894027",
                  },
                  {
                    text: "Ghada Alatrash: I almost lost my life waiting for emergency care in a Canadian hospital",
                    url: "https://canadiandimension.com/articles/view/i-almost-lost-my-life-waiting-for-emergency-care-in-a-canadian-hospital",
                  },
                  {
                    text: "Canadian Health Care Leaves Patients Frozen In Line",
                    url: "https://www.forbes.com/sites/sallypipes/2023/12/26/canadian-health-care-leaves-patients-frozen-in-line/?sh=7588df65c529",
                  },
                  {
                    text: "To fix Canada’s crumbling health care system, we need better tools than duct tape",
                    url: "https://www.theglobeandmail.com/opinion/article-to-fix-canadas-crumbling-health-care-system-we-need-better-tools-than/",
                  },
                ]}
              />

              <Section
                title="Health Care Access and Inequality"
                links={[
                  {
                    text: "Canada ranks lowest in health care access among wealthy nations",
                    url: "https://www.benefitsandpensionsmonitor.com/news/industry-news/canada-ranks-lowest-in-health-care-access-among-wealthy-nations/384837#:~:text=In%20a%20study%20conducted%20by,as%20per%20The%20Canadian%20Press.",
                  },
                  {
                    text: "Canada's population is booming — access to family doctors hasn't kept pace | CBC News",
                    url: "https://www.cbc.ca/news/politics/canada-popuation-booming-family-doctor-access-1.7087794",
                  },
                  {
                    text: "Canada ranks last in primary health care access among 10 wealthy countries: report",
                    url: "https://www.cp24.com/lifestyle/canada-ranks-last-in-primary-health-care-access-among-10-wealthy-countries-report-1.6817488",
                  },
                  {
                    text: "International survey shows Canada lags behind peer countries in access to primary health care",
                    url: "https://www.cihi.ca/en/international-survey-shows-canada-lags-behind-peer-countries-in-access-to-primary-health-care",
                  },
                  {
                    text: "Canada gets low marks for opioid deaths, access to health care in OECD report | CBC News",
                    url: "https://www.cbc.ca/news/health/oecd-canada-health-care-1.7021450",
                  },
                  {
                    text: "Canadians waiting longer for priority surgeries and diagnostic imaging compared with pre-pandemic period",
                    url: "https://www.cihi.ca/en/news/canadians-waiting-longer-for-priority-surgeries-and-diagnostic-imaging-compared-with-pre",
                  },
                  {
                    text: "Canada ranks last in primary health care access among 10 wealthy countries: report",
                    url: "https://www.thestar.com/life/health-wellness/canada-ranks-last-in-primary-health-care-access-among-10-wealthy-countries-report/article_afd54669-5cd5-5dd1-b193-d95c98203897.html",
                  },
                  {
                    text: "Racism, discrimination may lead to First Nations patients leaving emergency rooms: Alberta study | CBC News",
                    url: "https://www.cbc.ca/news/canada/edmonton/alberta-study-first-nations-patients-emergency-departments-1.7179342",
                  },
                  {
                    text: "How Canada's family doctor shortage compares to other countries",
                    url: "https://www.ctvnews.ca/canada/how-canada-s-family-doctor-shortage-compares-to-other-countries-1.6816653",
                  },
                ]}
              />

              <Section
                title="Health Policy and Planning"
                links={[
                  {
                    text: "The potential benefits of AI for healthcare in Canada",
                    url: "https://www.mckinsey.com/industries/healthcare/our-insights/the-potential-benefits-of-ai-for-healthcare-in-canada#/",
                  },
                  {
                    text: "As federal budget approaches, putting health care money to work is what Canadians want and need: CMA",
                    url: "https://www.newswire.ca/news-releases/as-federal-budget-approaches-putting-health-care-money-to-work-is-what-canadians-want-and-need-cma-805921440.html",
                  },
                  {
                    text: "To fix Canada’s health care, a hard economic truth must be acknowledged",
                    url: "https://www.theglobeandmail.com/business/commentary/article-canada-public-health-care-tax-revenues/",
                  },
                  {
                    text: "Canada falls short in several areas of health care in comparison to other OECD countries, report says",
                    url: "https://www.theglobeandmail.com/canada/article-canada-falls-short-in-several-areas-of-health-care-in-comparison-to/",
                  },
                  {
                    text: "Canada’s health-care crisis is gendered: How the burden of care falls to women",
                    url: "https://theconversation.com/canadas-health-care-crisis-is-gendered-how-the-burden-of-care-falls-to-women-215751",
                  },
                  {
                    text: "Waiting Your Turn: Wait Times for Health Care in Canada, 2023 Report",
                    url: "https://www.fraserinstitute.org/studies/waiting-your-turn-wait-times-for-health-care-in-canada-2023",
                  },
                  {
                    text: "Ontario government document shows historically bad emergency department wait times",
                    url: "https://www.thetrillium.ca/news/health/ontario-government-document-shows-historically-bad-emergency-department-wait-times-8118274",
                  },
                  {
                    text: "How capital gains tax changes could affect some family doctors",
                    url: "https://globalnews.ca/news/10435179/captial-gains-budget-2024-family-doctors/",
                  },
                  {
                    text: "B.C. has the highest doctor-patient ratio in Canada. Why is it still so difficult to access health care? | CBC News",
                    url: "https://www.cbc.ca/news/canada/british-columbia/more-physicians-health-care-report-bc-1.7118582",
                  },
                  {
                    text: "After a ‘decade of decline’ in health care, Canadians not convinced that money is enough to solve the crisis",
                    url: "https://angusreid.org/cma-health-care-access-priorities-2023/#gsc.tab=0",
                  },
                  {
                    text: "How to advocate for yourself and navigate a strained health-care system",
                    url: "https://globalnews.ca/news/10248469/how-to-advocate-navigate-canadian-health-care-system/",
                  },
                  {
                    text: "Canadian Medical Groups Demand Government Act to Fix Systems 'On the Verge of Collapse'",
                    url: "https://www.medscape.com/viewarticle/canadian-medical-groups-demand-government-act-fix-systems-2024a100036m",
                  },
                ]}
              />

              <Section
                title="Mental Health"
                links={[
                  {
                    text: "Canadians increasingly report poor mental health, cite growing economic concerns as a contributing factor",
                    url: "https://www.cihi.ca/en/news/canadians-increasingly-report-poor-mental-health-cite-growing-economic-concerns-as-a",
                  },
                ]}
              />

              <Section
                title="Staffing and Labor Issues"
                links={[
                  {
                    text: "Staff shortages prompt health authority's plea for Winnipeg nurses to pull extra shifts | CBC News",
                    url: "https://www.cbc.ca/news/canada/manitoba/winnipeg-nurses-memo-shortages-1.7065126",
                  },
                  {
                    text: "Canada spends $86M to accelerate health-care accreditation and address labour shortages",
                    url: "https://globalnews.ca/news/10226965/canada-funding-accelerate-health-care-accreditation-labour-shortages/",
                  },
                  {
                    text: "Canada’s unfilled health-care jobs doubled since pandemic began: StatCan",
                    url: "https://globalnews.ca/news/9897770/canada-unfilled-health-care-jobs/",
                  },
                  {
                    text: "Ontario extends funding that helps certain hospitals avoid temporary ER closures",
                    url: "https://globalnews.ca/news/9973543/ontario-extends-hospital-er-funding/",
                  },
                  {
                    text: "Monthly Wait Time Reporting | Winnipeg Regional Health Authority",
                    url: "https://wrha.mb.ca/wait-times/reports/",
                  },
                  {
                    text: "Registered Nurses from South Bruce Grey Health Centre Call Out Management for Failing the Community and Staff, ER Closures Will Risk Peoples’ Lives",
                    url: "https://www.ona.org/news-posts/20240514-south-bruce-grey-cuts/",
                  },
                  {
                    text: "Staffing shortages prompting some Manitoba families to hire their own home-care help | CBC News",
                    url: "https://www.cbc.ca/news/canada/manitoba/home-care-staffing-vacancies-1.7055855",
                  },
                  {
                    text: "Health Sciences North Health-Care Professionals at Mediation, Seeking Better Care for Patients",
                    url: "https://www.ona.org/news-posts/2024-05-16-hsn-mediation-better-care/",
                  },
                ]}
              />

              <Section
                title="Wait Time Reports and Statistics"
                links={[
                  {
                    text: "NACRS emergency department visits and lengths of stay",
                    url: "https://www.cihi.ca/en/nacrs-emergency-department-visits-and-lengths-of-stay",
                  },
                  {
                    text: "Wait times for priority procedures in Canada, 2024",
                    url: "https://www.cihi.ca/en/wait-times-for-priority-procedures-in-canada-2024",
                  },
                  {
                    text: "Canadians waiting longer for priority surgeries and diagnostic imaging compared with pre-pandemic period",
                    url: "https://www.cihi.ca/en/news/canadians-waiting-longer-for-priority-surgeries-and-diagnostic-imaging-compared-with-pre",
                  },
                  {
                    text: "Commonwealth Fund survey, 2023 | CIHI",
                    url: "https://www.cihi.ca/en/commonwealth-fund-survey-2023",
                  },
                  {
                    text: "Top 5 causes of emergency department wait times - Hamilton Health Sciences",
                    url: "https://www.hamiltonhealthsciences.ca/share/ed-wait-times/",
                  },
                  {
                    text: "Adult Emergency Department Wait Times",
                    url: "https://www.lhsc.on.ca/adult-ed/emergency-department-wait-times",
                  },
                  {
                    text: "Patient dies in St. Boniface emergency department | CBC News",
                    url: "https://www.cbc.ca/news/canada/manitoba/patient-dies-winnipeg-hospital-admitted-1.7090302",
                  },
                ]}
              />

              <Section
                title="Opinions and Commentaries"
                links={[
                  {
                    text: "Shift 'needed' to support Canadian health care",
                    url: "https://www.ctvnews.ca/video/c2905106-shift--needed--to-support-canadian-health-care",
                  },
                  {
                    text: "What doctors say needs to change Resources health care in Canada",
                    url: "https://www.ctvnews.ca/health/what-doctors-say-needs-to-change-Resources-health-care-in-canada-1.6576036",
                  },
                  {
                    text: "‘It was that or go home and prepare to die’: Canadians on why they sought surgery outside the country",
                    url: "https://www.ctvnews.ca/health/it-was-that-or-go-home-and-prepare-to-die-canadians-on-why-they-sought-surgery-outside-the-country-1.6515414",
                  },
                  {
                    text: "From general practitioner to treatment: Canadians' waited longer for health care in 2023",
                    url: "https://www.ctvnews.ca/health/from-general-practitioner-to-treatment-canadians-waited-longer-for-health-care-in-2023-1.6679356",
                  },
                  {
                    text: "‘There simply aren't enough people’: Canada's shortage of anesthesiologists contributing to surgical backlog, group says",
                    url: "https://www.ctvnews.ca/health/there-simply-aren-t-enough-people-canada-s-shortage-of-anesthesiologists-contributing-to-surgical-backlog-group-says-1.6506865",
                  },
                  {
                    text: "Experts say Canada's health-care system isn't ready for an aging population – here's why",
                    url: "https://www.ctvnews.ca/canada/experts-say-canada-s-health-care-system-isn-t-ready-for-an-aging-population-here-s-why-1.6652467",
                  },
                  {
                    text: "To reduce ER wait times, hospitals must stop using them as in-patient warehouses",
                    url: "https://www.theglobeandmail.com/opinion/article-to-reduce-er-wait-times-hospitals-must-stop-using-them-as-in-patient/",
                  },
                ]}
              />

              <Section
                title="Other Resources"
                links={[
                  {
                    text: "Ontario Health Sector: 2023 Budget Spending Plan Review",
                    url: "https://www.fao-on.org/en/Blog/Publications/health-update-2023",
                  },
                  {
                    text: "Ontario government sets aside $22 billion in ‘excess funds’: watchdog",
                    url: "https://globalnews.ca/news/9762549/ontario-government-22-billion-excess-funds-fao/",
                  },
                  {
                    text: "How to advocate for yourself and navigate a strained health-care system",
                    url: "https://globalnews.ca/news/10248469/how-to-advocate-navigate-canadian-health-care-system/",
                  },
                  {
                    text: "Canadian doctors are using 'outdated' guidelines to screen for cancer, experts warn | CBC News",
                    url: "https://www.cbc.ca/news/politics/cancer-screening-canada-guidelines-1.7180878",
                  },
                  {
                    text: "Canada’s unfilled health-care jobs doubled since pandemic began: StatCan",
                    url: "https://globalnews.ca/news/9897770/canada-unfilled-health-care-jobs/",
                  },
                  {
                    text: "How Canadian hospitals grew dependent on expensive out-of-town nurses",
                    url: "https://www.theglobeandmail.com/canada/article-how-canadian-hospitals-grew-dependent-on-expensive-out-of-town-nurses/",
                  },
                  {
                    text: "Monthly Wait Time Reporting | Winnipeg Regional Health Authority",
                    url: "https://wrha.mb.ca/wait-times/reports/",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;
