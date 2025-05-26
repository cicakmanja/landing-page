export default function GuestName() {
  const guestName = new URLSearchParams(window.location.search).get('to') || 'Tamu Undangan';
  return <p className="text-lg uppercase font-semibold tracking-wider">{guestName}</p>
}
