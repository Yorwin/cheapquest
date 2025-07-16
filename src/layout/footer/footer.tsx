import React from "react";
import styles from "@/styles/layout/footer.module.scss"

const Footer = () => {
    return (
        <>
            {/* Footer Section */}

            <section className={styles["footer-main-container"]} aria-label="Site footer">
                <div className={styles["content-container"]}>

                    {/* About Us Container */}

                    <div className={styles["about-us-container"]} aria-label="About CheapQuest">
                        <h3>CheapQuest</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque
                            sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor
                            pulvinar vivamus fringilla.
                        </p>
                        <small>All copyrights, trademarks and registered trademarks are the property of their  respective owners.</small>
                    </div>
                    <div className={styles["line-separation"]}></div>

                    {/* Info Container */}

                    <div className={styles["info-container"]}>

                        {/* Navigation */}

                        <nav className={styles["navigation-container"]} aria-label="Footer site links">
                            <h4>Navigation</h4>
                            <ul>
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Terms & Conditions</a></li>
                            </ul>
                        </nav>

                        {/* Contact Us */}

                        <address className={styles["contact-us-container"]} aria-label="Contact information">
                            <h4>Contact Us</h4>
                            <ul>
                                <li><a href="mailto:contactemail@contactemail.com">contactemail@contactemail.com</a></li>
                                <li><a href="mailto:contactemail@contactemail.com">contactemail@contactemail.com</a></li>
                            </ul>
                        </address>
                    </div>
                </div>
            </section>

            {/* Copyright Section */}

            <section className={styles["copyright-container"]}>
                <small>Copyright CheapQuest.com 2025, all rights reserved</small>
            </section>
        </>
    );
}

export default Footer;