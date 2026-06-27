export function speakJapanese(text: string) {
  if (typeof window === "undefined") return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ja-JP";
  utterance.rate = 0.82;
  utterance.pitch = 1.05;
  window.speechSynthesis.speak(utterance);
}
