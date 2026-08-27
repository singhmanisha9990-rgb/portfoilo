// Intro loader. Fixed-position, so it lives outside the smooth-scroll wrapper.
// The Hero component drives its animation and hides it.
export default function Loader() {
  return (
    <div id="loader" aria-hidden="true">
      <div className="spark" />
      <div className="lname">
        <span>M A N I S H A &nbsp; S I N G H</span>
      </div>
      <div className="lcount">000</div>
    </div>
  );
}
