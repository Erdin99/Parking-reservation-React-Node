import React from "react";
import "./footer.css";

function Footer() {
    return (
		<footer className="footer">
			<p>Možete me kontaktirati na nekoj od ovih društvenih mreža, te također pogledati profil na Github-u ukoliko vas zanima.</p>
			<ul className="social">
				<li><a href="#" target="_blank">Linkedin</a></li>
				<li><a href="https://www.facebook.com/login/" target="_blank">Facebook</a></li>
				<li><a href="https://www.instagram.com/" target="_blank">Instagram</a></li>
				<li><a href="https://github.com/" target="_blank">Github</a></li>
			</ul>
		</footer>
    );
};

export default Footer;