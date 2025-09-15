import OneLight from "@/public/images/service-icons/One.svg";
import TwoLight from "@/public/images/service-icons/Two.svg";
import ThreeLight from "@/public/images/service-icons/Three.svg";
import FourLight from "@/public/images/service-icons/Four.svg";
import FiveLight from "@/public/images/service-icons/Five.svg";
import SixLight from "@/public/images/service-icons/Six.svg";

export const servicesData = [
  {
    serialNumber: 1,
    slug: "data-analytics-business-intelligence",
    title: "Data Analytics & Business Intelligence",
    description:
      "Gain insights with advanced analytics and reporting. Using tools like Power BI and Tableau, we help drive smart business decisions.",
    lightLogo: OneLight,
    darkLogo: OneLight,
  },
  {
    serialNumber: 2,
    slug: "cloud-data-architecture",
    title: "Cloud Data & Architecture",
    description:
      "We design scalable data architectures, build efficient pipelines, and deliver real-time analytics tailored to business needs.",
    lightLogo: TwoLight,
    darkLogo: TwoLight,
  },
  {
    serialNumber: 3,
    slug: "data-migration-services",
    title: "Data Migration Services",
    description:
      "Seamless migration with minimal downtime. We manage on-prem, hybrid, and cloud transfers while ensuring data integrity and security.",
    lightLogo: ThreeLight,
    darkLogo: ThreeLight,
  },
  {
    serialNumber: 4,
    slug: "ai-ml-solutions",
    title: "AI & ML Solutions",
    description:
      "Use AI and ML to optimize operations, improve experiences, and drive automation. From predictive models to NLP, we deliver at scale.",
    lightLogo: FourLight,
    darkLogo: FourLight,
  },
  {
    serialNumber: 6,
    slug: "consulting-architecture-services",
    title: "Consulting & Architecture Services",
    description:
      "Our experts deliver end-to-end consulting from design to implementation, ensuring scalable, secure, and future-ready architectures.",
    lightLogo: FiveLight,
    darkLogo: FiveLight,
  },
  {
    serialNumber: 7,
    slug: "data-modeling-quality-services",
    title: "Data Modeling & Data Quality Services",
    description:
      "We ensure data accuracy, consistency, and integrity through robust modeling and quality practices, enabling reliable business insights.",
    lightLogo: SixLight,
    darkLogo: SixLight,
  },
];

export default servicesData;
