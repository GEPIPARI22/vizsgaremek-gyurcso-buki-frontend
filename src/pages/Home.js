import {Navigate} from 'react-router-dom'

const Home = () => {
  const token = localStorage.getItem("token")
  
  
  return (
      token ?
      <>
        <h1>Elméleti háttér</h1>
        <p>
        Az Szkt. 50. §-a értelmében az oktatót az igazgató háromévente értékeli a szakképzésért felelős miniszter által javasolt és a szakképző intézményre az alapján kialakított módszertan szerint. 
      Szakképzési centrumok esetében a főigazgató határozza meg a szakképzési centrum és a szakképző intézmény minőségirányítási feladatait, ennek keretében az oktatói értékeléssel kapcsolatos konkrét feladatokat.
      Az Szkr.  48. §-a értelmében a szakképző intézmény a minőségpolitika keretében a módszertani javaslat alapján elkészíti az oktatók értékelési rendszerét.</p>
      <p>
      Az oktatók értékelési rendszere keretében az igazgató a további intézményi vezetők és – döntése alapján – külső szakértő bevonásával háromévente
      a)	értékeli az oktató munkáját, erősségeket és fejlesztendő területeket határoz meg, jóváhagyja az oktató által az értékelés megállapításaihoz kapcsolódóan készített cselekvési tervet,
      b)	vizsgálja az Európai Szakképzési Minőségbiztosítási Referencia Keretrendszer alapján kidolgozott elvárásrendszer teljesülését, ennek keretében az oktató 
      </p>
      <ul>
        <li>szakmai felkészültségét,</li>
        <li>a szakképzés-releváns korszerű módszertan alkalmazását, </li>
        <li>pedagógiai tervezését,</li>
        <li>pedagógiai értékelését,</li>
        <li>együttműködését más oktatókkal, a szülőkkel és a duális partnerekkel, </li>
        <li>személyiségfejlesztő, csoportvezetői, tanulás támogató tevékenységét, </li>
        <li>innovációs tevékenységét és szakmai elkötelezettségét.</li>
        
      </ul>
      <p>
      Az oktatók teljesítményértékelésében az egyes értékelési területek nem azonos súllyal szerepelnek. 
      Az ún. súlyszorzók a szakképzés-fejlesztés ágazati szakmapolitikai céljai, a regionális szakképzési 
      célok és a helyi munkaerő-piaci helyzet alapján, a szakképzési centrum szintjén egységes alapelvek 
      mentén kerülnek meghatározásra. 
      </p>
      <p>Az értékelési feladatokat az intézmény vezetője végzi, támaszkodva a gyűjtött adatokra, 
        és vezetőtársai értékelő munkájára. Az igazgató esetén az értékelést a fenntartó 
        (szakképzési centrum esetén a főigazgató) végzi. Az oktatók teljesítménye és annak objektív, 
        differenciált értékelése vezetői felelősség. 
      </p>
      <p>Letölthető dokumentum: <a href="modszertani_javaslat.pdf" download>Módszertani javaslat</a></p>
      
      </>
      :
      <><Navigate to="../" /></>
    );
  };
  
  export default Home;