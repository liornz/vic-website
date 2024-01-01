import { convertUrl } from '@/utils/url-utils';
import styles from './press.module.scss';
import Link from 'next/link';
interface Props {}

const Press: React.FC<Props> = (props) => {
  const {} = props;
  return (
    <div className={styles.main}>
      <h1 className={styles.header}>German</h1>
      <section className={styles.section}>
        <h3>Vanitas, Bernheimer Contemporary. München, Septenber 2014:</h3>
        <ul>
          <li>
            <Link href={`/press/${convertUrl('external-www.muenchenarchitektur.com/beitrag/22099-vanitas')}`}>
              <p>München Architektur Online Magazin - Sept. 2014</p>
            </Link>
          </li>
          <li>
            <Link href="/articles/ArtInvestor_12_14.pdf">
              <p>Art Investor Magazin - Sept. 2014</p>
            </Link>
          </li>
          <li>
            <Link href="/press/muenchner-abendzeitung">
              <p>Münchner Abendzeitung - Sept. 2014</p>
            </Link>
          </li>
          <li>
            <Link
              href={`/press/${convertUrl(
                'external-www.faz.net/aktuell/feuilleton/kunst-und-architektur/open-art-2014-zieht-die-art-basel-nach-muenchen-13150324-p2.html'
              )}`}
            >
              <p>Frankfurter Allgemeine Zeitung - 12, Sept. 2014</p>
            </Link>
          </li>
          <li>
            <a
              href="https://www.welt.de/print/die_welt/kultur/article132206370/Muenchner-Materialismus.html"
              target="_blank"
              rel="noreferrer"
            >
              <p>Die Welt - 13, Sept. 2014</p>
            </a>
          </li>
          <li>
            <a
              href="https://www.handelsblatt.com/arts_und_style/kunstmarkt/galerienrundgang-muenchen-kreative-demonstranten/10704832-all.html"
              target="_blank"
              rel="noreferrer"
            >
              <p>Handelsblatt - 15, Sept. 2014</p>
            </a>
          </li>
          <li>
            <Link href={`/press/${convertUrl('external-www.mucbook.de/knochen-gold-und-ein-brot-aus-beton/')}`}>
              <p>MUCBOOK - 15, Sept. 2014</p>
            </Link>
          </li>
          <li>
            <a href="https://www.tabularasamagazin.de/vanitas-contemporary-art-in-der-galerie-bernheimer/" target="_blank" rel="noreferrer">
              <p>tabularasa - Zeitung für Gesellschaft & Kultur - 24, Sept. 2014</p>
            </a>
          </li>
          <li>
            <Link
              href={`/press/${convertUrl('external-www.exklusiv-muenchen.de/news/isabel-bernheimer-interview-29173')}`}
            >
              <p>Exklusiv München - 13, Dec. 2014</p>
            </Link>
          </li>
        </ul>
      </section>
      <section className={styles.section}>
        <h3>WHO CARES Exhibition, Bernheimer Contemporary. Berlin, July 2015:</h3>
        <ul>
          <li>
            <a href="https://www.gallerytalk.net/die-metamorphose-des-victor-alaluf/" target="_blank" rel="noreferrer">
              <p>gallerytalk.net - 26, Nov. 2015</p>
            </a>
          </li>
          <li>
            <Link 
            href={`/press/${convertUrl('external-www.exberliner.com/whats-on/art/who-cares-exhibition/')}`}
            >
              <p>EXBERLINER - July, 2015</p>
            </Link>
          </li>
        </ul>
      </section>
      <section className={styles.section}>
        <h3>Jüdisches Museum Berlin</h3>
        <ul>
          <li>
            <a href="https://www.handelszeitung.ch/panorama/kunstautomat-auf-knopfdruck-kunst" target="_blank" rel="noreferrer">
              <p>BILANZ - 20, August, 2014</p>
            </a>
          </li>
          <li>
            <a href="https://www.jmberlin.de/blog/2015/03/barfuss-im-dunkeln/" target="_blank" rel="noreferrer">
              <p>Barfus im Dunkeln - 1, March, 2015</p>
            </a>
          </li>
        </ul>
      </section>
      <h1 className={styles.header}>English</h1>
      <section className={styles.section}>
        <h3>Vanitas Exhibition, Bernheimer Contemporary. München, Septenber 2014:</h3>
        <ul>
          <li>
            <Link
              href={`/press/${convertUrl('external-watchfineartslondon.wordpress.com/2014/09/14/berlinese-still-lifes-in-munich/#more-1815')}`}
            >
              <p>Watch Fine Arts London - 14, Sept. 2014</p>
            </Link>
          </li>
          <li>
            <Link 
            href={`/press/${convertUrl('external-www.fluctibus.com/central/2014/09/11/vanitas/')}`}
            >
              <p>The fluctibus magazine - 11, Sept. 2014</p>
            </Link>
          </li>
          <li>
            <Link href="/press/ARTNEWS-article">
              <p>The Art Newspaper - Nov. 2014</p>
            </Link>
          </li>
          <li>
            <a href="https://www.jmberlin.de/blog-en/2015/03/barefoot-in-the-dark/" target="_blank" rel="noreferrer">
              <p>Barefoot in the Dark - 1, March, 2015</p>
            </a>
          </li>
        </ul>
      </section>
      <section className={styles.section}>
        <h3>WHO CARES Exhibition, Bernheimer Contemporary. Berlin, July 2015:</h3>
        <ul>
          <li>
            <Link 
            href={`/press/${convertUrl('external-mystylery.com/en/blog/2015/07/23/isabel-bernheimers-exhibition-who-cares/')}`}
            >
              <p>My Mistery - 23, July, 2015</p>
            </Link>
          </li>
        </ul>
      </section>
      <section className={styles.section}>
        <h3>THE TASTE OF ADICTION, Bernheimer Contemporary. Berlin, July 2015:</h3>
        <ul>
          <li>
            <a href="http://lodownmagazine.com/pulse/taste-addiction" target="_blank" rel="noreferrer">
              <p>London Magazine - 3, Nov. 2015</p>
            </a>
          </li>
        </ul>
      </section>
      <h1 className={styles.header}>Spanish</h1>
      <section className={styles.section}>
        <h3>Descalso en la Pscuridad - Museo Juan Yaparí, Posadas, Misiones, Aegentina</h3>
        <ul>
          <li>
            <a href="https://cdn.elterritorio.com.ar/notaimpresa.aspx?c=7919885976373638" target="_blank" rel="noreferrer">
              <p>El Territorio - 10, March 2013</p>
            </a>
          </li>
          <li>
            <a href="https://cdn.elterritorio.com.ar/notaimpresa.aspx?c=1107315940974202" target="_blank" rel="noreferrer">
              <p>El Territorio - 16, March 2013</p>
            </a>
          </li>
          <li>
            <Link
            href={`/press/${convertUrl('external-www.primeraedicion.com.ar/nota/105216/mi-muestra-habla-de-esa-oscuridad-en-la-que-nos-podemos-encontrar/')}`}
            >
              <p>Primera Edicíon - 14, March 2013</p>
            </Link>
          </li>
        </ul>
      </section>
      <section className={styles.section}>
        <h3>Other</h3>
        <ul>
          <li>
            <a href="https://cdn.elterritorio.com.ar/notaimpresa.aspx?c=5040768954416006" target="_blank" rel="noreferrer">
              <p>El Territorio - 7, March 2012</p>
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Press;
