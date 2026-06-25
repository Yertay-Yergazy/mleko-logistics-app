import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../components/atoms/Button";
import Icon from "../components/atoms/Icon";
import OffersCarousel from "../components/organisms/OffersCarousel";
import ContactCard from "../components/molecules/ContactCard";
import { offerSlides, featuredOffer } from "../api/mockData/offers";
import type { Offer } from "../api/types";
import heroCollage from "../assets/photos/hero-collage.webp";

export default function HomePage() {
  const [slides, setSlides] = useState<Offer[][]>([]);

  useEffect(() => {
    setSlides(offerSlides);
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-[radial-gradient(120%_130%_at_88%_8%,#2c40a6_0%,#243089_46%,#1c2a78_100%)] px-6 py-16 text-white lg:px-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="font-mono text-[12.5px] font-medium uppercase tracking-widest text-sky">
              Международная логистика · mleko.kz
            </div>
            <h1 className="mt-4 font-display text-4xl font-black uppercase italic leading-[1.05] tracking-tight sm:text-5xl">
              Весь мир в одной <span className="text-orange">доставке</span>
            </h1>
            <p className="mt-4 max-w-[520px] text-[17px] leading-relaxed text-[#c7d2ef]">
              Авто, авиа, море и ЖД под ключ. Считаем стоимость и бронируем груз онлайн.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/raschet">
                <Button>Рассчитать стоимость →</Button>
              </Link>
              <Link to="/uslugi">
                <Button variant="ghost">Каталог услуг</Button>
              </Link>
            </div>
          </div>
          <div className="hidden items-center justify-center lg:flex">
            <img src={heroCollage} alt="Авиа, авто и морские перевозки" className="w-full max-w-[560px]" />
          </div>
        </div>
      </section>

      <section className="bg-navy-2 px-6 py-12 lg:px-16">
        {slides.length > 0 && <OffersCarousel slides={slides} />}

        <div className="mt-8 rounded-2xl bg-[linear-gradient(135deg,#243089,#2b3f9e)] p-7 sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <span className="inline-block rounded-full bg-orange px-3 py-1 font-mono text-[10.5px] font-bold uppercase text-white">
              {featuredOffer.badge}
            </span>
            <div className="mt-2 font-display text-2xl font-extrabold italic text-white">{featuredOffer.title}</div>
            <p className="mt-1 max-w-lg text-sm text-[#c7d2ef]">{featuredOffer.description}</p>
          </div>
          <Button className="mt-4 sm:mt-0">{featuredOffer.ctaLabel}</Button>
        </div>
      </section>

      <section className="bg-mist-2 px-6 py-14 lg:px-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <div className="font-mono text-xs font-medium uppercase tracking-widest text-blue">
              Связь · круглосуточно
            </div>
            <h2 className="mt-2 font-display text-[34px] font-extrabold uppercase italic leading-tight text-navy">
              Работаем <span className="text-orange">24/7</span>
            </h2>
            <p className="mt-2 max-w-[560px] text-[15px] leading-relaxed text-muted">
              Звоните или пишите в любое время суток — менеджер ответит в течение нескольких минут.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ContactCard icon={<Icon name="phone" size={18} />} label="Телефон" value="+7 727 304 33 61" />
            <ContactCard icon={<Icon name="email" size={18} />} label="E-mail" value="byte083@gmail.com" />
            <ContactCard icon={<Icon name="whatsapp" size={18} />} label="WhatsApp" value="+7 705 596 96 04" tone="green" />
          </div>
        </div>
      </section>
    </>
  );
}
