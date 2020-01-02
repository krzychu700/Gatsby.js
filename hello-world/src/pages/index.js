import React from "react"
import { Link } from "gatsby";
import PrimaryButton from "../components/PrimaryButton/PrimaryButton.js";
import Layout from "../components/layout";

export default ({ children }) => (
	<Layout>

		<div className="main-layout-container">
			<h1>Hello Gatsby!</h1>
			<p>What a world.</p>
			<img src="https://source.unsplash.com/random/400x200" alt="" />
			<PrimaryButton>Click me</PrimaryButton>
		</div>

	</Layout>
)