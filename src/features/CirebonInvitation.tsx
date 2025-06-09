import GuestName from "../components/GuestName";
import { SaveTheDate } from "../components/Countdown";
import AtmCard from "../components/AtmCard";
import ConfirmForm from "../components/ConfirmForm";
import "../styles/tailwind.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useRef, useState } from "react";

export default function CirebonInvitation() {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isInitialized, setIsInitialized] = useState(false);
	const [hasScrolled, setHasScrolled] = useState(false);

	useEffect(() => {
		audioRef.current = new Audio("/bg-3.mp3");
		audioRef.current.loop = true;
		audioRef.current.volume = 1.0;

		audioRef.current.addEventListener("play", () => setIsPlaying(true));
		audioRef.current.addEventListener("pause", () => setIsPlaying(false));
		audioRef.current.addEventListener("error", (err) =>
			console.error("Audio failed to load or play:", err)
		);

		return () => {
			audioRef.current?.pause();
			audioRef.current = null;
		};
	}, []);

	useEffect(() => {
		const handleVisibilityChange = () => {
			if (!audioRef.current || !isInitialized) return;

			if (document.hidden) {
				audioRef.current.pause();
			} else {
				audioRef.current.play().catch((err) =>
					console.error("Audio resume failed:", err)
				);
			}
		};

		document.addEventListener("visibilitychange", handleVisibilityChange);
		return () =>
			document.removeEventListener("visibilitychange", handleVisibilityChange);
	}, [isInitialized]);

	const init = () => {
		setHasScrolled(true);
		document.body?.classList.remove("overflow-y-hidden");

		if (!isInitialized && audioRef.current) {
			audioRef.current
				.play()
				.then(() => setIsInitialized(true))
				.catch((err) => console.error("Audio play failed:", err));
		}
	};

	const toggleSound = () => {
		if (!isInitialized || !audioRef.current) return;

		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play().catch((err) =>
				console.error("Toggle play failed:", err)
			);
		}
	};

	const handleActionClick = () => {
		init();

		document.body.classList.remove("overflow-y-hidden");

		const el = document.querySelector("#bride-groom");
		if (el) {
			el.scrollIntoView({
				behavior: "smooth",
				block: "start",
				inline: "nearest",
			});
		}
		AOS.refresh();
	};

	useEffect(() => {
		if (hasScrolled) {
			document.body.classList.remove("overflow-y-hidden");

			const el = document.querySelector("#bride-groom");
			if (el) {
				el.scrollIntoView({
					behavior: "smooth",
					block: "start",
					inline: "nearest",
				});
			}
			AOS.refresh();
		} else {
			document.body.classList.add("overflow-y-hidden");
		}
	}, [hasScrolled]);

	useEffect(() => {
		AOS.init({
			once: false,
			mirror: true,
		});
	}, []);

	return (
		<main className={`font-[Alice] overflow-x-hidden ${hasScrolled ? '' : 'overflow-y-hidden'}`}>
			<section
				id="cover"
				className={`inset-0 min-h-screen w-full text-center text-white z-10 font-[Alice] ${hasScrolled ? 'relative' : 'fixed'}`}
			>
				<div
					className="absolute inset-0 bg-[url(/bg.jpg)] bg-fixed bg-cover bg-center"
				>
				</div>

				<div
					className="relative w-full h-screen bg-[#00000088] flex flex-col justify-around items-center text-center py-15"
				>
					<div
						className="flex flex-col gap-4 uppercase"
						data-aos="fade-up"
						data-aos-anchor-placement="center-bottom"
					>
						<p className="text-xl tracking-widest">Pernikahan</p>
						<p
							className="text-4xl
            font-bold
            tracking-widest
            font-[Alice]"
						>
							Nida & Imam
						</p>
						<p className="text-xl tracking-widest">14 JUNI 2025</p>
					</div>

					<div className="h-[10%]"></div>
					<div
						className="text-center max-w-md flex flex-col items-center gap-4"
						data-aos="fade-up"
						data-aos-anchor-placement="center-bottom"
					>
						<p>Yth. Bapak/Ibu/Saudara/i</p>
						<GuestName />
						<p>
							Tanpa mengurangi rasa hormat,<br /> kami mengundang anda untuk menghadiri
							acara pernikahan kami.
						</p>
						<div className="mt-5">
							{hasScrolled
								? (
									<button
										onClick={handleActionClick}
										type="button"
										className="relative flex justify-center items-center w-[56px] h-[56px] rounded-full border-1 p-2 animate__animated animate__bounce animate__slow animate__infinite cursor-pointer"
									>
										<svg
											fill="currentColor"
											height="24"
											width="24"
											version="1.1"
											xmlns="http://www.w3.org/2000/svg"
											xmlnsXlink="http://www.w3.org/1999/xlink"
											viewBox="0 0 407.437 407.437"
											xmlSpace="preserve"
										>
											<g id="bgCarrier" strokeWidth="0"></g>
											<g
												id="tracerCarrier"
												strokeLinecap="round"
												strokeLinejoin="round"></g>
											<g id="iconCarrier">
												<g>
													<polygon
														points="203.718,322.929 21.179,140.984 0,162.232 203.718,365.287 407.437,162.232 386.258,140.984 "
													></polygon>
													<polygon
														points="407.437,63.398 386.258,42.15 203.718,224.095 21.179,42.15 0,63.398 203.718,266.453 "
													></polygon>
												</g>
											</g>
										</svg>
									</button>
								)
								: (
									<button
										onClick={handleActionClick}
										type="button"
										className="relative flex justify-center items-center rounded-full border-1 px-4 py-2 bg-white text-[#915282] font-semibold hover:bg-[#915282] hover:text-white transition-colors duration-300 cursor-pointer"
									>
										Buka Undangan
									</button>
								)
							}
						</div>
					</div>
				</div>
			</section>

			<section
      id="bride-groom"
      className="relative w-full text-center animate-[fade-in_1s_ease] overflow-hidden font-[Alice]"
    >
      <div
        className="absolute inset-0 bg-[url(/bg-3.webp)] bg-fixed bg-cover bg-center -z-0 opacity-20"
      >
      </div>

      <div
        className="relative w-full text-[#915282] flex flex-col justify-around items-center text-center pt-15"
      >
        <div
          className="max-w-2xl inline-flex flex-col justify-around items-center rounded-4xl p-5"
        >
          <div className="mb-15 flex flex-col items-center gap-3">
            <p className="text-md md:text-xl" data-aos="fade-up">
              Dengan segala puji bagi Allah yang telah menciptakan makhluk-Nya
              berpasang-pasangan,<br /> Ya Allah izinkanlah kami merangkaikan cinta
              yang Engkau berikan dalam ikatan pernikahan.
            </p>
          </div>
          <div className="w-full self-start text-start">
            <div
              className="flex flex-row justify-evenly items-center gap-5"
              data-aos="fade-up"
            >
              <div
                className="h-28 w-24 md:h-64 md:w-48 rounded-t-full relative overflow-clip border shrink-0"
              >
                <div
                  className="absolute inset-0 bg-[url(/bride.jpeg)] bg-position-[125px_-45px] md:bg-position-[280px_-120px] bg-size-[150px] md:bg-size-[360px]"
                >
                </div>
              </div>
              <div className="text-center">
                <p
                  className="text-md lg:text-2xl font-bold tracking-wider pb-2 mb-2 font-[Alice] border-b-2 border-b-current"
                >
                  Umrotun Nida, S.Pd., M.Hum.
                </p>
                <div className="text-md md:text-2xl">
                  <p>Putri Kedua dari</p>
                  <p>Bapak Sobirin & Ibu Ia Ropiah</p>
                </div>
              </div>
            </div>

            <div
              className="my-10 text-md md:text-xl tracking-widest text-center font-[Quintessential]"
              data-aos="fade-up"
            >
              Dengan
            </div>

            <div className="self-end text-end flex flex-col">
              <div
                className="flex flex-row justify-evenly items-center gap-5"
                data-aos="fade-up"
              >
                <div
                  className="h-28 w-24 md:h-64 md:w-48 rounded-t-full relative overflow-clip border shrink-0 order-1"
                >
                  <div
                    className="absolute inset-0 bg-[url(/broom.jpeg)] bg-position-[435px_0px] bg-size-[150px] md:bg-position-[310px_-10px] md:bg-size-[360px]"
                  >
                  </div>
                </div>
                <div className="text-center">
                  <p
                    className="text-md lg:text-2xl font-bold tracking-wider pb-2 mb-2 font-[Alice] border-b-2 border-b-current"
                  >
                    Imam Ade Surya, S.Kom.
                  </p>
                  <div className="text-center">
                    <div className="text-md md:text-2xl">
                      <p>Putra Pertama dari</p>
                      <p>Bapak Suryadi & Ibu Wakingah</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-40 relative" data-aos="fade-up">
          <div
            className="absolute inset-0 bg-[url(/bg-bottom.webp)] bg-repeat-x bg-position-[0_0] bg-size-[448px]"
          >
          </div>
        </div>
      </div>
    </section>

			<section
				id="save-the-date"
				className="relative h-screen w-full text-center text-white"
			>
				<div
					className="absolute inset-0 bg-[url(/bg.jpg)] bg-fixed bg-cover bg-center -z-0"
				>
				</div>

				<div
					className="relative w-full h-screen text-center bg-[#00000088] text-[#915282] flex justify-center items-center"
				>
					<div
						className="w-full md:max-w-2xl inline-flex flex-col justify-around items-center rounded-4xl p-5"
					>
						<SaveTheDate
							link="https://calendar.google.com/calendar/u/0/r/eventedit?text=Pernikahan+Nida+%26+Imam&dates=20250614T020000Z/20250614T100000Z&details=Undangan+Pernikahan+Umrotun+Nida+%26+Imam+Ade+Surya+yang+Insya+Allah+akan+diselenggarakan+pada+Sabtu,+14+Juni+2025&location=https://maps.app.goo.gl/UzzpUTd4ZhAEuGWv6"
							eventName="Wedding"
							date={new Date("2025-06-14T09:00:00").valueOf()}
						/>
					</div>
				</div>
			</section>

			<section id="events" className="relative w-full text-center text-white">
				<div
					className="absolute inset-0 bg-[url(/bg-2.webp)] bg-fixed bg-cover bg-center"
				>
				</div>

				<div
					className="relative w-full text-center text-[#915282] flex justify-center items-center py-15 px-8 md:px-5"
				>
					<div
						className="relative bg-white border-1 rounded-xl w-full md:max-w-xl inline-flex flex-col justify-around gap-10 items-center px-10 py-40"
					>
						<div
							className="flex flex-col animate-[fade-in_1s_ease] w-100"
							data-aos="fade-up"
						>
							<div
								className="relative mx-auto w-full h-30 flex justify-center items-center mb-3"
							>
								<img
									src="/bg-ribbon.webp"
									alt="background top"
									className="absolute inset-0 object-contain w-54 h-30 mx-auto translate-x-[14px]"
								/>
								<p
									className="text-2xl uppercase font-semibold absolute bottom-[28px]"
								>
									Akad Nikah
								</p>
							</div>
							<p className="text-xl mb-2">14 Juni 2025</p>
							<p className="text-xl mb-3">09:00 - 10:00 WIB</p>
							<p className="text-md mb-5">
								Blok VI Gegesik Kidul RT 03 RW 15<br /> Kecamatan Gegesik,<br /> Kabupaten
								Cirebon, Jawa Barat
							</p>
							<a
								className="inline-block ring-1 ring-[#915282] px-6 py-2 mx-auto rounded-2xl hover:bg-[#915282] w-fit hover:text-white z-10"
								href="https://maps.app.goo.gl/NeaXD59MmUEcdPmz8"
								target="_blank"
								rel="noopener noreferrer">Lihat Lokasi</a
							>
						</div>

						<div
							className="flex flex-col animate-[fade-in_1s_ease] w-100 mb-10"
							data-aos="fade-up"
						>
							<div
								className="relative mx-auto w-full h-30 flex justify-center items-center mb-3"
							>
								<img
									src="/bg-ribbon.webp"
									alt="background top"
									className="absolute inset-0 object-contain w-54 h-30 mx-auto translate-x-[14px]"
								/>
								<p
									className="text-2xl uppercase font-semibold absolute bottom-[28px]"
								>
									Resepsi
								</p>
							</div>
							<p className="text-xl mb-2">14 Juni 2025</p>
							<p className="text-xl mb-3">11:00 - 17:00 WIB</p>
							<p className="text-md mb-5">
								Blok VI Gegesik Kidul RT 03 RW 15<br /> Kecamatan Gegesik,<br /> Kabupaten
								Cirebon, Jawa Barat
							</p>
							<a
								className="inline-block ring-1 ring-[#915282] px-6 py-2 mx-auto rounded-2xl hover:bg-[#915282] w-fit hover:text-white z-10"
								href="https://maps.app.goo.gl/NeaXD59MmUEcdPmz8"
								target="_blank"
								rel="noopener noreferrer">Lihat Lokasi</a
							>
						</div>
						<div className="absolute top-0 left-0">
							<img
								src="/bg-frame.webp"
								alt="background top"
								className="object-contain w-full h-50 mx-auto rotate-180 translate-x-[-24px] translate-y-[-40px]"
							/>
						</div>
						<div className="absolute bottom-0 right-0">
							<img
								src="/bg-frame.webp"
								alt="background top"
								className="object-contain w-full h-50 mx-auto translate-x-[28px] translate-y-[50px]"
							/>
						</div>
					</div>
				</div>
			</section>

			<section
				id="frontpage"
				className="relative w-full text-center text-white animate-[fade-in_1s_ease] overflow-hidden"
			>
				<div
					className="absolute inset-0 z-0 bg-[url(/bg.jpg)] bg-cover bg-center bg-fixed"
				>
				</div>
				<div className="relative w-full py-[10rem] bg-[#00000088]">
					<div
						className="relative max-w-xl flex flex-col justify-around items-center mx-auto h-full px-5"
						data-aos="fade-up"
					>
						<div>
							<p className="font-light italic">
								“Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan
								pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu
								merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta
								dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar
								terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.”
							</p>
							<p className="font-bold">(QS. Ar-Rum: 21)</p>
						</div>
					</div>
				</div>
			</section>

			<section
				id="anvelope"
				className="relative w-full text-center text-white animate-[fade-in_1s_ease]"
			>
				<div className="absolute inset-0 z-0 bg-pink-100 bg-cover bg-center bg-fixed">
				</div>
				<div className="relative w-full py-20 bg-[#00000066]">
					<div
						className="relative w-full md:max-w-3xl flex flex-col justify-around items-center mx-auto h-full px-5"
						data-aos="fade-up"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="size-10"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
							></path>
						</svg>

						<p className="text-center my-10">
							Doa Restu Anda merupakan karunia yang sangat<br />berarti bagi kami.
							Namun jika memberi adalah<br />ungkapan tanda kasih Anda, kami akan
							senang<br />hati menerimanya yang tentu akan semakin<br /> melengkapi
							kebahagiaan kami.️
						</p>
						<div
							className="w-full flex flex-col md:flex-row justify-center items-center gap-5"
						>
							<AtmCard
								name="Imam Ade Surya"
								accountNumber="1020007200162"
							/>
							<AtmCard
								name="Umrotun Nida"
								accountNumber="1030010559579"
							/>
						</div>
						<div className="w-full md:max-w-xl">
							<ConfirmForm />
						</div>
					</div>
				</div>
			</section>

			<section
				id="thank"
				className="relative h-screen w-full text-center text-white overflow-hidden"
			>
				<div
					className="absolute inset-0 bg-[url(/bg.jpg)] bg-fixed bg-cover bg-center"
				>
				</div>

				<div
					className="relative w-full h-screen bg-[#00000088] flex flex-col justify-center items-center text-center px-5"
				>
					<div className="max-w-lg" data-aos="fade-up">
						<p className="text-3xl mb-5 tracking-wide">Terima Kasih</p>
						<p className="text-md leading-relaxed tracking-wide mb-10 text-center">
							Merupakan suatu kehormatan bagi kami,<br />apabila
							Bapak/Ibu/Saudara/i berkenan<br /> untuk hadir di hari bahagia kami.
						</p>
						<p className="text-lg font-semibold tracking-widest">Nida & Imam</p>
					</div>
				</div>
			</section>

			<div className="fixed bottom-10 right-5 z-50">
				<button
					onClick={toggleSound}
					id="toggle-sound"
					className={`flex items-center p-4 bg-white text-black rounded-full focus:outline-none cursor-pointer ${hasScrolled ? 'opacity-100' : 'opacity-0'}`}
				>
					{isPlaying
						? (
							<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
								<path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
							</svg>
						)
						: (
							<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
								<path d="M8 5v14l11-7L8 5z" />
							</svg>
						)}
				</button>
			</div>
		</main>
	)
}