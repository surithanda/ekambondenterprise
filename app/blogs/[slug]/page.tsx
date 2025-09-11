import getMarkDownContent from "@/utils/GetMarkDownContent";
import getMarkDownData from "@/utils/GetMarkDownData";
import { BlogType } from "../page";
import LayoutTwo from "@/components/shared/LayoutTwo";
import PageHero from "@/components/common/page-hero-section";
import CTA from "@/components/common/cta-section";
import CtaImageSlider from "@/components/common/cta-image-slider";
import BlogContent from "@/components/blogs/blogs-content";




export async function generateStaticParams() {
  const blogs: BlogType[] = getMarkDownData("data/blogs-data");

  return blogs.map((post) => ({
    slug: post.slug,
  }));
}

export const metadata = {
  title: "Mystic Minds Insights",
  description:
    "Discover expert blogs from Mystic Minds on AI, data solutions, and digital transformation strategies.",
};


const BlogDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;
  const blog = getMarkDownContent("data/blogs-data/", slug);
  const postBlog = blog.data;

  return (
    <LayoutTwo>
      <PageHero
        badgeTitle="Blog Details"
        title={postBlog.title}
        description={postBlog.description}
        spacing="pt-32 md:pt-44 lg:pt-[200px] pb-10 md:pb-16 lg:pb-[88px] xl:pb-[100px] relative overflow-hidden"
      />
      <BlogContent blog={blog} />
      <CTA>
        Let's chat!
        <CtaImageSlider
          slides={[
            { id: "1", img: "/images/agent/01.jpg" },
            { id: "3", img: "/images/agent/03.jpg" },
            { id: "2", img: "/images/agent/11.png" },
          ]}
        />
        with us.
        <i className="block font-instrument italic max-md:inline-block max-sm:pl-2 sm:mt-10">
          A virtual coffee?
        </i>
      </CTA>
    </LayoutTwo>
  );
};

export default BlogDetails;
