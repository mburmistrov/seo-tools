import { type MetaData, generateMeta } from "./metadata"

describe("generateMeta suite", () => {
	const baseMetaData: MetaData = {
		title: "Test Page",
		description: "This is a test page.",
		url: "https://example.com",
		image: "",
	}

	const baseExpected = [
		{ title: "Test Page" },
		{ property: "og:title", content: "Test Page" },
		{ property: "og:description", name: "description", content: "This is a test page." },
		{ property: "og:url", content: "https://example.com" },
		{ name: "twitter:card", property: "twitter:card", content: "summary_large_image" },
	]

	it("generates meta tags with required fields", () => {
		expect(generateMeta(baseMetaData)).toEqual(baseExpected)
	})

	it("includes og:image if image is provided", () => {
		const metaData = { ...baseMetaData, image: "https://picsum.photos/200/300" }
		expect(generateMeta(metaData)).toEqual([
			...baseExpected,
			{ property: "og:image", content: "https://picsum.photos/200/300" },
		])
	})

	it("includes og:site_name if siteName is provided", () => {
		const metaData = { ...baseMetaData, siteName: "Example Site" }
		expect(generateMeta(metaData)).toEqual([...baseExpected, { name: "og:site_name", content: "Example Site" }])
	})

	it("uses custom twitterCard if provided", () => {
		const metaData = { ...baseMetaData, twitterCard: "summary" }
		const expected = baseExpected.map((tag) =>
			tag.name === "twitter:card" ? { name: "twitter:card", property: "twitter:card", content: "summary" } : tag
		)
		expect(generateMeta(metaData)).toEqual(expected)
	})

	it("includes additional meta descriptors", () => {
		const metaData = { ...baseMetaData, image: "https://picsum.photos/200/300" }
		const additional = [
			{ property: "og:type", content: "website" },
			{ name: "twitter:site", content: "@example" },
		]

		expect(generateMeta(metaData, additional)).toEqual([
			...baseExpected,
			{ property: "og:image", content: "https://picsum.photos/200/300" },
			...additional,
		])
	})

	it("handles empty additional data array", () => {
		const metaData = { ...baseMetaData, image: "https://picsum.photos/200/300" }
		expect(generateMeta(metaData, [])).toEqual([
			...baseExpected,
			{ property: "og:image", content: "https://picsum.photos/200/300" },
		])
	})
})
