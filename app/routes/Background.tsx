import SpringFade from "~/components/spring-fade/SpringFade";
import "./Background.css";

function Background() {
  return (
    <div className="background__container outer-wrapper">
      <div className="background inner-wrapper">
        <div className="background__title">
          <h1>The lead up to the Thirty Years' War</h1>
        </div>
        <SpringFade>
          <div className="background__text-container">
            <h2>The Protestant Reformation</h2>
            <p>
              The protestant reformation was a{" "}
              <strong>religious movement</strong> that swept through 1500s
              Europe, resulting in the Protestant branch of Christianity.
            </p>

            <p>
              The Protestant reformation began in 1517 when the Christian German
              monk, <strong>Martin Luther</strong>, published his{" "}
              <strong>95 theses</strong>. His work sparked controversy as they
              directly contradicted the teachings of the Catholic Church, such
              as paying money to cleanse sins. Luther argued that salvation was
              a gift from god to those who had faith. His writings encouraged
              others to challenge catholic doctrine throughout europe, e.g. John
              Calvin in france, from whom the calvinist branch of christianity
              gets its name{" "}
            </p>
          </div>
        </SpringFade>

        <SpringFade>
          <div className="background__text-container">
            <h2>The Peace of Augsburg</h2>
            <p>
              The{" "}
              <strong>
                rapid spread of the Lutheran and Calvinist doctrines
              </strong>{" "}
              following the Protestant Reformation was met by a period of Roman{" "}
              <strong>Catholic resurgence</strong> known as{" "}
              <strong>Counter-Reformation</strong>.
            </p>

            <p>
              <strong>Religious conflicts</strong> between Protestants and
              Catholics in the Holy Roman Empire led to the{" "}
              <strong>Peace of Augsburg</strong>
              (1555). This officially ended the relgigious struggle between the
              two groups and made the legal division of Christianity permanenet
              within the Holy Roman Empire. The main principle of this peace was
              that that{" "}
              <strong>
                {" "}
                a state's ruler could choose Lutheranism or Roman Catholicism
              </strong>{" "}
              as their official religion and religion of their subjects.
              Religious freedom was not sanctioned for other protestant sects
              such as calvinism.
            </p>
            <p></p>
          </div>
        </SpringFade>

        <SpringFade>
          <div className="background__text-container">
            <h2>Christian Alliances</h2>
            <p>
              Religious conflicts such as the <strong>Cologne War</strong>{" "}
              (1583-1588) and <strong>Strasbourg Bishops' War</strong>{" "}
              (1592-1604) prompted the creation of the{" "}
              <strong>Catholic League</strong> and the{" "}
              <strong>Protestant Union</strong>, with the intention of
              safeguarding the interests of the Holy Roman Empire's Catholic and
              Protestant nobility respectively.{" "}
            </p>

            <p>
              The Protestant Union, formed in 1608, was a millitary alliance of
              protestant German states of the Holy Roman Empire that promised
              mutual aid and support against Catholic interests.{" "}
            </p>

            <p>
              The Catholic League was formed in 1609, in response to
              anti-Catholic incidents and tensions, and also to counter the
              growing power of Protestants. It was formed by Catholic princes of
              the empire, and spearheaded by Maximillian, Duke of Bavaria
            </p>
          </div>
        </SpringFade>

        <SpringFade>
          <div className="background__text-container">
            <h2>Political Instability</h2>

            <p>
              The Empire and its representative institutions were{" "}
              <strong>heavily fragmented</strong>. It included 300 Imperial
              Estates distributed across <strong>Germany</strong>,{" "}
              <strong>the Low Countries</strong>,{" "}
              <strong>Northern Italy</strong> and modern <strong>France</strong>
              . It was difficult for the emperor to rule a disparate population,
              especially one free to make its own alliances.
            </p>

            <p>
              Although Holy Roman Emperors were elected, since 1440 the position
              had been held by a member of the{" "}
              <strong>House of Habsburg</strong>, the largest single landowner
              in the Holy Roman Empire with territories containing over eight
              million subjects, including Austria, Bohemia and Hungary
            </p>
          </div>
        </SpringFade>
      </div>
    </div>
  );
}

export default Background;
