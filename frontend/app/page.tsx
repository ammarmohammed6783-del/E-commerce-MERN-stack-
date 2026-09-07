"use server";

import Card from "@/components/Card";
import Landing from "@/features/home/components/Landing";
import getNewArrivals from "@/features/home/services/newArrivals";
import getTopSelling from "@/features/home/services/getTopSelling";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import ClothTypes from "@/features/home/components/ClothTypes";

export default async function Home() {
  const arrivals = await getNewArrivals();
  const topSelling = await getTopSelling();

  return (
    <div>
      <Landing />

      <section className="bg-stone-100 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 border-b border-stone-300 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-emerald-700">
                Curated for you
              </p>
              <h2 className="text-4xl font-black uppercase leading-none tracking-tight text-stone-950 sm:text-5xl">
                New arrivals
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-stone-500">
              Fresh silhouettes and everyday essentials for your next rotation.
            </p>
          </div>

          <div>
            <Carousel>
              <CarouselContent>
                {arrivals.map((card) => (
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={card._id} >
                    <Card product={card}/>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNext />
              <CarouselPrevious />
            </Carousel>
          </div>

          <div className="mb-10 mt-25 flex flex-col gap-4 border-b border-stone-300 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-emerald-700">
                Curated for you
              </p>
              <h2 className="text-4xl font-black uppercase leading-none tracking-tight text-stone-950 sm:text-5xl">
                Top Selling
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-6 text-stone-500">
              top selling for top clients
            </p>
          </div>

          <div>
            <Carousel>
              <CarouselContent>
                {topSelling.map((card) => (
                  <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={card._id} >
                    <Card product={card}/>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNext />
              <CarouselPrevious />
            </Carousel>
          </div>
        </div>
      </section>

      <ClothTypes />
    </div>
  );
}

// even home has a feature