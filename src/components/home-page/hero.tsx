/* eslint-disable react/no-unescaped-entities */
import styles from './hero.module.scss';
import { useTranslation } from '../../app/i18n';

interface Props {
  lng: string;
}

const Hero: React.FC<Props> = async ({ lng }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng, 'common');

  const aboutText = (
    <div className={styles.lead}>
      <p>{t('metext1')}</p>
      <p>{t('metext2')}</p>
      <p>{t('metext3')}</p>
      <p>{t('metext4')}</p>
      <p>{t('metext5')}</p>
      <p>{t('metext6')}</p>
      <p>{t('metext7')}</p>
    </div>
  );

  const resume = (
    <>
      <div className={styles.section}>
        <h3 className={styles.heading}>Education</h3>
        <p>2009 – MFA – Haifa University in Israel</p>
        <p>2007 – BFA – Haifa University in Israel</p>
        <p>1999 – Graphic design – Avni Institute in Tel-Aviv, Israel</p>
      </div>
      <div className={styles.section}>
        <h3 className={styles.heading}>Awards and Prizes</h3>
        <p>
          2016 – "Tied Hands" – 6th Prize, International Confederation of Art
          Critics – London.
        </p>
        <p>
          2007 – Vidra Foundation Award in contemporary art for a young artist –
          Haifa University
        </p>
        <p>
          2007 – Excellence Scholarship – City of Haifa – Fund in honor of
          Colonel Beno Fishbuch
        </p>
      </div>
      <div className={styles.section}>
        <h3 className={styles.heading}>Biennial</h3>
        <p>
          2016 - BACOS – Bienal Internacional de Arte Contemporáneo Emergente Eve-Maria
          Zimmermann – San Miguel de Abona, Tenerife, Spain
        </p>
        <p>2016 – Santorini Art Biennale – Santorini, Greece</p>
        <p>
          2015 – "Omboyere – Bianal Misionera de Arte 2015", Posadas, Misiones,
          Argentina
        </p>
        <p>2008 – The Biennial for Young artists – Ramat-Hasharon, Israel</p>
      </div>
      <div className={styles.section}>
        <h3 className={styles.heading}>Exhibitions</h3>
        <p>2017 – BIAEMX – International Art Biennial El Escarabajo – México</p>
        <p>2017 – Oblivion – MPG Art – Vittoria – Italy</p>
        <p>2017 – Fomenar – Arte Borgo Gallery – Rome</p>
        <p>2017 – AAF Selection – EXP Art Studio&Gallery, Bibbiena, Italy</p>
        <p>2017 – Affordable Art Fair – Milan, Italy</p>
        <p>2016 – Vanitas#1 – LoosenArt – Cagliari – Italy</p>
        <p>
          2016 – @Berlin Walls – Priests & Prawns – WBB Willner Brauerei –
          Berlin
        </p>
        <p>
          2016 – BACOS – Bienal Internacional de Arte Contemporáneo Emergente
          Eve-Maria Zimmermann – San Miguel de Abona, Tenerife, Spain
        </p>
        <p>2016 – Santorini Art Biennial – Santorini, Greece</p>
        <p>
          2016 – Lynx 2016 Second Edition – Trieste, Ajdovščinam, Zagabria,
          Livorno
        </p>
        <p>2016 – Ar[t]Cevia – International Art Festival – Arcevia, Italy</p>
        <p>2016 – In Between – Kulturschöpfer Gallery, Berlin</p>
        <p>2016 – Arte Laguna Art Prize – Arsenale - Venice, Italy</p>
        <p>
          2016 – "Reflection, Self-reflection" – Bernheimer Contemporary –
          Monbijou Residence, Berlin
        </p>
        <p>
          2015 – "KIK Seven – Time Lies" – Kino International, Berlin, Germany
        </p>
        <p>
          2015 – "The Taste of Addiction" – Bernheimer Contemporary – Monbijou
          Residence, Berlin
        </p>
        <p>
          2015 – "Highlights International Art Fair Munich", Munich, Germany
        </p>
        <p>
          2015 – "Omboyere – Bianal Misionera de Arte 2015", Posadas, Misiones,
          Argentina
        </p>
        <p>
          2015 – "Who Cares" – Bernheimer Contemporary – Monbijou Residence,
          Berlin
        </p>
        <p>
          2014 – "Barefoot in the Dark" – Amerika-Haus Munich, Munich Art Week
          Opening
        </p>
        <p>2014 – "Vanitas" – Bernheimer Contemporary, Munich, Germany</p>
        <p>2014 – Kunstautomat im Jüdisches Museum Berlin – Berlin, Germany</p>
        <p>
          2013 – 10 Years Anniversary Fine Arts Department Haifa University –
          Accomplished Students
        </p>
        <p>
          2012 – "Barefoot in the Dark" – Juan Yapari Museum, Posadas Argentina
        </p>
        <p>
          2011 – RAW Artists' Studios Gallery – Romantik, Realismus, Revolusion
          – Berlin, Germany
        </p>
        <p>
          2010 – RAW Artists' Studios Gallery – New Structures – Berlin, Germany
        </p>
        <p>
          2009 – "Northern Exposure" Exhibition – Artists'-Studios Gallery,
          Tel-Aviv, Israel
        </p>
        <p>2009 – "Oxygen"– MFA Exhibition – Haifa University, Israel</p>
        <p>2008 – "Gregory" Exhibition – Ein-Hod Art Museum</p>
        <p>2008 – The Biennial for Young artists – Ramat-Hasharon, Israel</p>
        <p>
          2008 – "Shadow" – Solo Exhibition – Artists-House Gallery, Tel-Aviv,
          Israel
        </p>
        <p>
          2008 – "First Opportunity" Exhibition for young artists – Agrippas
          Gallery, Jerusalem, Israel
        </p>
        <p>
          2007 – Graduates exhibition of the Creative Arts Department, Haifa
          University, Israel
        </p>
        <p>2006 – "Incognito" Exhibition, Haifa University, Israel</p>
        <p>
          2005 – Exhibition for the Board of Trusties, Haifa University, Israel
        </p>
        <p>
          2005 – "A man with no Shirt", Performance & Video Art Exhibition,
          Tel-Aviv, Israel
        </p>
        <p>
          2005 – "Another Tel-Aviv", The Tel-Aviv-Jaffa Contemporary Art Center,
          Performance & Video Art Exhibition
        </p>
        <p>2002 – Dream of Colors – Solo Exhibition, Mobile AL, USA</p>
      </div>
    </>
  );

  return (
    <div className={styles.About}>
      <h3 className="header">{t('about')}</h3>
      <div className="header-underline"></div>
      <div className={styles.AboutContainer}>
        <div className={styles.AboutText}>{aboutText}</div>
        <div className={styles.resume}>{resume}</div>
      </div>
    </div>
  );
};

export default Hero;