import { useState } from "react";

export default function ConfirmForm() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [receiver, setReceiver] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!name || !amount || !receiver) return;

    const message = `*Confirmation Transfer*\nName: ${name}\nAmount: Rp${amount}\nTo: ${receiver}`;
    const encodedMsg = encodeURIComponent(message);
    const phone = "6282122500485";

    window.open(`https://wa.me/${phone}?text=${encodedMsg}`, "_blank");
  };

  return (
    <div className="w-[320px] aspect-auto mx-auto mt-5 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-xl font-semibold mb-5 text-[#915282]">Konfirmasi Kirim Hadiah</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-[#915282]">
        <input
          type="text"
          placeholder="Nama Pengirim"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 border rounded-lg border-[#915282] focus:outline-none focus:ring-2 focus:ring-[#915282]"
          required
        />
        <input
          type="text"
          placeholder="Nominal/Kado"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="px-4 py-2 border rounded-lg border-[#915282] focus:outline-none focus:ring-2 focus:ring-[#915282]"
          required
        />
        <select
          value={receiver}
          onChange={(e) => setReceiver(e.target.value)}
          className="px-4 py-2 border rounded-lg border-[#915282] focus:outline-none focus:ring-2 focus:ring-[#915282]"
          required
        >
          <option value="" disabled>
            -- Pilih Penerima --
          </option>
          <option value="Imam Ade Surya">Imam Ade Surya</option>
          <option value="Dewi Lestari">Umrotun Nida</option>
        </select>
        <button
          type="submit"
          className="text-white bg-[#915282] hover:bg-[#91528299] py-2 border-1 rounded-xl cursor-pointer"
        >
          Konfirmasi Melalui WhatsApp
        </button>
      </form>
    </div>
  );
}
