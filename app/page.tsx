import Image from "next/image";
import Blaadjes from "@/public/blaadjes-optimized.svg";
import Grolschje from "@/public/grolschje-optimized.svg";
import Lipsum from "@/components/Lipsum";
import Bubbel from "@/components/Bubbel";

export default function Home() {
  return (
    <main>
      <div className="logo-bovenkant">
        <div className="lucht">
          <div className="blaadjes">
            <Image
              className="blaadjes-afbeelding"
              src={Blaadjes}
              alt="Two leafs joined at the stem"
              priority
            />
            <div className="blaadjes-steeltje" />
          </div>
          <div className="steel">
            <div className="steel-onder" />
          </div>
          <div className="bagger-tekst">Bagger</div>
        </div>
        <div className="aarde-bovenkant">
          <div className="aarde-bovenkant-vruchtbaar" />
        </div>
        <div className="bier-tunnel-boven" />
      </div>
      <div className="content">
        <div className="content-achter">
          <div className="bier-tunnel" />
        </div>
        <div className="content-voor">
          <Bubbel style={{ width: "min-content" }}>
            <a href="https://quotes.dispuutbagger.nl">Quotes</a>
          </Bubbel>

          <Bubbel style={{ width: "min-content" }}>
            <a href="https://dispuutbagger.nl/declaratie">Declaraties</a>
          </Bubbel>

          <Bubbel style={{ width: "min-content" }}>
            <a href="https://dispuutbagger.nl/planning">Planning</a>
          </Bubbel>
        </div>
      </div>
      <div className="logo-onderkant">
        <div className="bier-tunnel-onder" />
        <div className="bier-gat">
          <Image
            className="biertje-afbeelding"
            src={Grolschje}
            alt="A Grolsch beer bottle"
            priority
          />
        </div>
      </div>
    </main>
  );
}
