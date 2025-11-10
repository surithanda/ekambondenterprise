import getMarkDownData from '@/utils/GetMarkDownData'
import RevealWrapperV2 from '../animation/RevealWrapperV2'

export interface ProductsDataType {
  slug: any
  content: any
  [key: string]: any
}

let products: any[] = getMarkDownData('data/products')
let sortedProducts = products.toSorted((a, b) => a.year - b.year)

const ProductItems = () => {
  return (
    <section className="pb-14 pt-14 md:pb-16 md:pt-16 lg:pb-[88px] lg:pt-[88px] xl:pb-[100px] xl:pt-[100px]">
      <div className="container grid gap-20 max-md:gap-y-16 md:grid-cols-2 xl:gap-16">
        {sortedProducts?.map((item) => (
          <RevealWrapperV2
            as="a"
            href={`/products/${item?.slug}`}
            key={item?.slug}
            className="reveal-me project-item underline-hover-effect group col-span-full flex flex-col gap-x-10 gap-y-6 lg:items-center">
            <figure className="overflow-hidden max-lg:w-full">
              <img
                src={item?.image}
                alt={item?.alt}
                className="h-full w-full object-cover transition-all duration-500 group-hover:rotate-3 group-hover:scale-125 rounded-2xl"
                width={250}
              />
            </figure>
            <div className="project-item-content">
              <p className="text-xs font-normal uppercase leading-3 tracking-[5px] text-secondary dark:text-backgroundBody md:leading-6 md:tracking-[8px]">
                {item?.category}
              </p>
              <div className="blog-title mb-2 mt-3 md:mt-4 lg:mb-4 lg:mt-5 xl:mt-7">
                <h3 className="text-3xl sm:text-4xl md:text-[40px] lg:text-[56px] lg:leading-[1.2] lg:tracking-[-1.68px]">
                  {item?.title}
                </h3>
              </div>
              
            </div>
          </RevealWrapperV2>
        ))}
      </div>
    </section>
  )
}

export default ProductItems
