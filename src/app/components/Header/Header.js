import "./Header.css";
import Link from "next/link";

export default function Header({ backLink, headerTitle, headerButtons, headerDate, headerTime }) {
    return (
        <section className="header">
            <div className="header-subsection">
                {
                    backLink ? (
                        <div className="back-link">
                            <Link href={backLink}>{"< Back"}</Link>
                        </div>
                    ) : null
                }
                <div className="header-title">
                    <h1>{headerTitle}</h1>
                </div>
                {
                    (headerDate || headerTime) && (
                        <div className="header-details">
                            <p>{new Date(headerDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/New_York' })} • {headerTime.slice(0, 5)}</p>
                        </div>
                    )
                }
            </div>
            {
                headerButtons ? (
                    <div className="header-subsection">
                        {
                            headerButtons.map((button, index) => (
                                button && <button key={index} className={button.buttonClassName} onClick={button.onClickFunction}>
                                    {button.buttonName}
                                </button>
                            ))
                        }
                    </div>
                ) : null
            }
        </section>
    );
};