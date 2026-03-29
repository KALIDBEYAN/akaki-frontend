import { useEffect, useCallback, useRef } from "react";

const AutoLogout = ({ logoutAction, timeoutInMinutes = 15 }) => {

  const timerRef = useRef(null);
  const timeoutInMs = timeoutInMinutes * 60 * 1000;

  // ሎግ አውት የሚያደርገው ፈንክሽን
  const handleLogout = useCallback(() => {
    console.log("ተጠቃሚው ለረጅም ጊዜ ስላልተንቀሳቀሰ ሲስተሙ ዘግቶታል!");
    alert("ለረጅም ጊዜ ምንም እንቅስቃሴ ስላላደረጉ ሲስተሙ ዘግቶብዎታል!");
    logoutAction(); // በ App.js ያለውን የlogout ፈንክሽን ይጠራል
  }, [logoutAction]);

  // ታይመሩን እንደገና የሚጀምር (Reset) ፈንክሽን
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(handleLogout, timeoutInMs);
  }, [handleLogout, timeoutInMs]);

  useEffect(() => {
    // ክትትል የሚደረግባቸው የተጠቃሚ እንቅስቃሴዎች
    const events = ["mousemove", "mousedown", "keypress", "scroll", "touchstart"];

    // በእያንዳንዱ እንቅስቃሴ ታይመሩን Reset ያደርጋል
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // መጀመሪያ ሲጀምር ታይመሩን ያስነሳል
    resetTimer();

    // ኮምፖነንቱ ሲጠፋ ክትትሉን ያቆማል (Cleanup)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [resetTimer]);

  return null; // ምንም የሚታይ ነገር የለውም (Logic ብቻ ነው)
};

export default AutoLogout;