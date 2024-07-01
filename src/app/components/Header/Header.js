import "./Header.css";
import Link from "next/link";

export default function Header({ backLink, headerTitle }) {
    return (
        <section className="header">
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
        </section>
    );
};