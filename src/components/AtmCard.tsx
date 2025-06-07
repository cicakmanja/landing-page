import { useState } from "react";

export default function AtmCard({ name, accountNumber }: { name: string, accountNumber: string }) {
	const [hasCopied, setHasCopied] = useState<boolean>(false);
	function formatAccountNumber(raw: string) {
		if (!/^\d{13}$/.test(raw)) {
			throw new Error("Invalid account number format. Must be 13 digits.");
		}
		return `${raw.slice(0, 3)}-${raw.slice(3, 6)}-${raw.slice(6, 10)}-${raw.slice(10)}`;
	}

	function copyAccountNumber() {
		navigator.clipboard
			.writeText(accountNumber)
			.then(() => {
				setHasCopied(true);
				setTimeout(() => setHasCopied(false), 3000);
			})
			.catch((err) => {
				console.error("Gagal menyalin: ", err);
			});
	}

	return (
		<div
			className="relative w-[320px] h-[180px] aspect-auto bg-[url(/card.webp)] bg-cover bg-center bg-no-repeat mb-5 rounded-lg flex flex-col py-5 px-10 justify-between text-slate-800"
		>
			<div
				className="flex justify-end items-center absolute top-[10px] right-[10px]"
			>
				<img src="/mandiri.png" alt="mandiri" className="w-24 h-10" />
			</div>
			<div className="flex justify-between items-center mt-auto">
				<div className="flex flex-col items-start">
					<p className="text-md font-bold">
						{formatAccountNumber(accountNumber)}
					</p>
					<p className="text-sm">a.n. {name}</p>
				</div>
				<div className="flex flex-col items-end">
					<button
						type="button"
						className="px-3 py-2 rounded-lg bg-[#00000088] hover:bg-[#00000044] text-white cursor-pointer"
						onClick={() => copyAccountNumber()}
					>
						{hasCopied ? "Disalin" : "Salin"}
					</button>
				</div>
			</div>
		</div>
	)
}