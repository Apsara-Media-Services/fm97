import Head from "next/head";
import Script from "next/script";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { map, find, lowerCase } from "lodash";
import * as moment from "moment";
import { useEffect } from "react";
import Image from "next/image";
import ImageWithFallback from "../components/ImageWithFallback";
import Hls from "hls.js";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

const radioLogo = "/fm97-youth-logo.png";

export default function Home({
  programs,
  currentProgram,
  nextProgram,
  apiBaseUrl,
  radioBaseURL,
  error,
}) {
  useEffect(() => {
    var source = radioBaseURL;
    var audio = document.getElementById("plyr");
    new Plyr(audio, {
      captions: { active: true, update: true, language: "en" },
    });
    if (!Hls.isSupported()) {
      audio.src = source;
    } else {
      const hls = new Hls();
      hls.loadSource(source);
      hls.attachMedia(audio);
      window.hls = hls;
    }
  }, []);

  if (error) {
    return <div>An error occured: {error.message}</div>;
  }

  return (
    <>
      <Head>
        <title>The Voice of Our Youth</title>
        <meta
          name="description"
          content="កម្មវិធីផ្សាយប្រចាំថ្ងៃរបស់វិទ្យុសំលេងយុវជន FM 97MHz | ព័ត៌មានពិត អប់រំ កម្សាន្ត និងចំណេះដឹង"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="The Voice of Our Youth" />
        <meta property="og:site_name" content="AMS Radio FM97" />
        <meta property="og:image" content={radioLogo} />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Script id="matomo">
        {`
            var _paq = window._paq = window._paq || [];
            /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
            var u="//analytics.ams.com.kh/";
            _paq.push(['setTrackerUrl', u+'matomo.php']);
            _paq.push(['setSiteId', '8']);
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
            })();
        `}
      </Script>
      <main className={styles.main}>
        <section className="block-title">
          <div className="flex items-center justify-center gap-3">
            <span className="flex items-center h-14 w-14 md:h-18 md:w-18 relative">
              <Image
                src={radioLogo}
                alt="radio logo"
                layout="fill"
                width={"60px"}
                height={"60px"}
                objectFit="cover"
                className="rounded-lg "
              />
            </span>
            <div>
              <div className="text-base md:text-xl lg:text-2xl">
                Listen to AMS Radio FM97
              </div>
              <div className="text-sm">The Voice of Our Youth</div>
            </div>
          </div>
        </section>

        {programs.length > 0 && (
          <>
            <div className="container mx-auto px-3 sm:px-4 py-4 bg-slate-50 rounded-t-md">
              {(currentProgram || nextProgram) && (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-cover bg-slate-100 w-full">
                      <ImageWithFallback
                        src={`${apiBaseUrl}${
                          currentProgram.program?.thumbnail?.url || ""
                        } `}
                        className="aspect-video rounded-md shadow-lg "
                        alt={currentProgram.program?.title}
                      />
                    </div>
                    <div className="border-slate-600">
                      {currentProgram && (
                        <>
                          <div className="air-now">
                            <span className="badge">
                              {moment().valueOf() >=
                              currentProgram.startTimestamp
                                ? "កំពុងផ្សាយ"
                                : nextProgram
                                ? "កម្មវិធីបន្ទាប់"
                                : ""}
                            </span>
                            <h3 className="event-title md:text-2xl md:leading-8 mt-5">
                              {currentProgram.program?.title}
                            </h3>
                            <div className="date-time">
                              <div className="flex gap-1">
                                <Image
                                  src="/clock-solid.svg"
                                  alt="Landscape picture"
                                  width={12}
                                  height={20}
                                  className="w-3"
                                />
                                <time>
                                  {convertTimeTo12HourFormat(
                                    currentProgram?.startTimestamp
                                  )}{" "}
                                  ~{" "}
                                  {convertTimeTo12HourFormat(
                                    currentProgram?.endTimestamp
                                  )}
                                </time>
                              </div>
                            </div>
                            <div className="desc md:text-lg">
                              {currentProgram.program?.description}
                            </div>

                            {currentProgram &&
                              moment().valueOf() >=
                                currentProgram.startTimestamp && (
                                <>
                                  <audio
                                    id="plyr"
                                    controls
                                    crossOrigin="true"
                                    playsInline
                                  ></audio>
                                </>
                              )}
                          </div>
                          <hr className="border-slate-200 my-3" />
                        </>
                      )}

                      {moment().valueOf() >= currentProgram.startTimestamp &&
                        nextProgram && (
                          <>
                            <div className="up-next">
                              <span className="badge text-xs">
                                កម្មវិធីបន្ទាប់
                              </span>
                              <h3 className="event-title md:text-1xl font-normal md:leading-8">
                                {nextProgram.program?.title}
                              </h3>
                              <div className="flex gap-1">
                                <Image
                                  src="/clock-solid.svg"
                                  alt="Landscape picture"
                                  width={12}
                                  height={20}
                                  className="w-3"
                                />
                                <time className="text-sm">
                                  {convertTimeTo12HourFormat(
                                    nextProgram?.startTimestamp
                                  )}{" "}
                                  ~{" "}
                                  {convertTimeTo12HourFormat(
                                    nextProgram?.endTimestamp
                                  )}
                                </time>
                              </div>
                            </div>
                          </>
                        )}
                    </div>
                  </div>
                </>
              )}

              <div className="list-event pt-10 pb-4">
                <h3 className="list-title text-xl md:text-3xl font-bold border-b pb-4">
                  កម្មវិធីផ្សាយប្រចាំថ្ងៃ <small>(ម៉ោងកម្ពុជា)</small>
                </h3>
                <ul className="list-next sm:grid md:grid-cols-3 lg:grid-cols-4">
                  {programs.map((item) => (
                    <li key={item.id}>
                      <h3 className="event-title lg:text-2xl font-normal md:leading-10">
                        {item.program?.title}
                      </h3>
                      <time className="text-sm block py-3">
                        {convertTimeTo12HourFormat(item?.startTimestamp)} ~{" "}
                        {convertTimeTo12HourFormat(item?.endTimestamp)}
                      </time>
                      {/* <ImageWithFallback 
                          src={`${apiBaseUrl}${item.program?.thumbnail?.url || ''}`}
                          alt={item.program?.title}
                        /> */}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}

        {programs.length == 0 && <>{/* HTML HERE */}</>}
      </main>
    </>
  );
}

function convertTimeTo12HourFormat(timestamp) {
  return moment(timestamp).format("hh:mm A");
}

function convertDateTimeToTimestamp(datetime) {
  return moment(datetime).valueOf();
}

export async function getServerSideProps() {
  const currentDayName = lowerCase(moment().format("dddd"));

  const { data: todaySchedule } = await axios.get(
    `${process.env.API_BASE_URL}/schedules/${currentDayName}`
  );

  const programs = map(todaySchedule.programs, (program) => {
    const currentDate = moment().format("YYYY-MM-DD");
    const dateFormat = "YYYY-MM-DD HH:mm:ss";
    const startDateTime = moment(`${currentDate} ${program?.startTime}`).format(
      dateFormat
    );
    const endDateTime = moment(`${currentDate} ${program?.endTime}`).format(
      dateFormat
    );
    return {
      ...program,
      startTimestamp: convertDateTimeToTimestamp(startDateTime),
      endTimestamp: convertDateTimeToTimestamp(endDateTime),
    };
  });

  const currentProgram = find(programs, (program) => {
    const timestamp = moment().valueOf();
    return (
      timestamp >= program.startTimestamp && timestamp < program.endTimestamp
    );
  });

  const nextProgram = find(programs, (program) => {
    const timestamp = currentProgram?.endTimestamp || moment().valueOf();
    return program.startTimestamp >= timestamp;
  });

  return {
    props: {
      apiBaseUrl: process.env.API_BASE_URL,
      radioBaseURL: process.env.RADIO_BASE_URL,
      programs,
      currentProgram: currentProgram || nextProgram || null,
      nextProgram: nextProgram || null,
    },
  };
}
