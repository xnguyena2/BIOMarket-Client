import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BeerDetail } from '../object/BeerDetail';

@Injectable({
  providedIn: 'root'
})
export class RichResultSEOService {

  static scriptType = 'application/ld+json';
  static websiteSchema =
    {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      "image": [
        "https://www.trumbien.com/assets/img/Logo.png",
        "https://farm66.staticflickr.com/65535/51620237683_800c73ede5_o.jpg",
        "https://farm66.staticflickr.com/65535/51545564106_778236857a_o.jpg",
        "https://farm66.staticflickr.com/65535/51620613419_fd1be5e2cf_o.jpg",
        "https://farm66.staticflickr.com/65535/51620622024_da882904bf_o.jpg"
      ],
      "name": "Trùm Biển - Hải Sản Cao Cấp",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "413 Lê Văn Quới,Bình Trị Đông A, Bình Tân",
        "addressLocality": "HỒ CHí Minh",
        "addressRegion": "HCM",
        "postalCode": "763039",
        "addressCountry": "VN"
      },
      "review": {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "4.9",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Bình Gold"
        }
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 10.77918374575849,
        "longitude": 106.60604839763865
      },
      "url": "https://www.trumbien.com/",
      "telephone": "+84822088079",
      "servesCuisine": "Seafood",
      "priceRange": "200.000VND - 5.000.000VND",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
          ],
          "opens": "07:00",
          "closes": "22:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "08:00",
          "closes": "23:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Sunday",
          "opens": "08:00",
          "closes": "22:00"
        }
      ],
      "menu": "https://www.trumbien.com/search/all",
      "acceptsReservations": "True"
    };

  static productSchema = (product: BeerDetail) => ({
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": product.images.map(x=>x.thumbnail),
    "description": product.detail,
    "sku": product.category,
    "mpn": product.category,
    "brand": {
      "@type": "Brand",
      "name": "Trùm Biển"
    },
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "4.9",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Bình Gold"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "10000"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.trumbien.com/detail/${product.beerSecondID}`,
      "priceCurrency": "VND",
      "price": product.listUnit[product.validIndex].price * (100 - product.listUnit[product.validIndex].discount) / 100,
      "priceValidUntil": new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString(),
      "itemCondition": "https://schema.org/UsedCondition",
      "availability": "https://schema.org/InStock"
    }
  });


  constructor(@Inject(DOCUMENT) private _document: Document) { }


  removeStructuredData(): void {
    const els: Element[] = [];
    ['structured-data', 'structured-data-org'].forEach(c => {
      els.push(...Array.from(this._document.head.getElementsByClassName(c)));
    });
    els.forEach(el => this._document.head.removeChild(el));
  }

  insertSchema(schema: Record<string, any>, className = 'structured-data'): void {
    let script: HTMLScriptElement;
    let shouldAppend = false;
    if (this._document.head.getElementsByClassName(className).length) {
      script = this._document.head.getElementsByClassName(className)[0] as HTMLScriptElement;
    } else {
      script = this._document.createElement('script');
      shouldAppend = true;
    }
    script.setAttribute('class', className);
    script.type = RichResultSEOService.scriptType;
    script.text = JSON.stringify(schema);
    if (shouldAppend) {
      this._document.head.appendChild(script);
    }
  }
}
