import React from "react"
import { Link } from "gatsby";
import PrimaryButton from "../components/PrimaryButton/PrimaryButton.js";

export default () => (
	<div className="main-layout-container">
		<h1>Hello Gatsby!</h1>
		<p>What a world.</p>
		<img src="https://source.unsplash.com/random/400x200" alt="" />
		<PrimaryButton>Click me</PrimaryButton>
		
		<Link to="/contact/">Contact</Link>
		<Link to="/about/">About</Link>
	</div>
)