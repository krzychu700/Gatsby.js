import React from "react"
import Header from "../components/Header/header.js"
import { Link } from "gatsby";

export default () => (
	<div style={{ color: `teal` }}>
		<Header
			headerText="About Gatsby"
			arbitraryPhrase="is arbitrary">
		</Header>
		<p>Such wow. Very React.</p>
		<img src="https://source.unsplash.com/random/400x200" alt="" />

		<Link to="/">Back</Link>
	</div>
)