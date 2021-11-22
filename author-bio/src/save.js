import { __ } from "@wordpress/i18n";
import { RichText, useBlockProps } from "@wordpress/block-editor";

export default function save(props) {
	const {
		attributes: {
			title,
			content,
			mediaAlt,
			mediaURL,
			contentAlignment,
			backgroundColor,
			textColor,
		},
	} = props;

	return (
		<div
			{...useBlockProps.save()}
			style={{ backgroundColor, color: textColor }}
		>
			<div className="author-bio__container">
				<img className="author-bio__image" src={mediaURL} alt={mediaAlt} />
				<div className="author-bio__content">
					<div className="author-bio__title">
						<RichText.Content
							tagName="h2"
							value={title}
							style={{ textAlign: contentAlignment }}
						/>
					</div>
					<RichText.Content
						tagName="div"
						className="author-bio__text"
						value={content}
					/>
				</div>
			</div>
		</div>
	);
}
