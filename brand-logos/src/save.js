import { __ } from "@wordpress/i18n";
import { RichText, useBlockProps } from "@wordpress/block-editor";

export default function save(props) {
	const {
		attributes: {
			title,
			imageOneAlt,
			imageOneURL,
			imageTwoAlt,
			imageTwoURL,
			imageThreeAlt,
			imageThreeURL,
			backgroundColor,
			opacity,
		},
	} = props;

	return (
		<>
			<div {...useBlockProps.save()} style={{ backgroundColor }}>
				<div className="copywriter-brand-logos__container">
					<RichText.Content tagName="h2" value={title} className="title" />
					<div className="logo-container">
						<img
							style={{ opacity: opacity + "%" }}
							src={imageOneURL}
							alt={imageOneAlt}
							className="image-one"
						/>
						<img
							style={{ opacity: opacity + "%" }}
							src={imageTwoURL}
							alt={imageTwoAlt}
							className="image-two"
						/>
						<img
							style={{ opacity: opacity + "%" }}
							src={imageThreeURL}
							alt={imageThreeAlt}
							className="image-three"
						/>
					</div>
				</div>
			</div>
		</>
	);
}
