import { __ } from "@wordpress/i18n";
import { RichText, useBlockProps } from "@wordpress/block-editor";

export default function save(props) {
	const {
		attributes: {
			credentials,
			content,
			mediaURL,
			descriptionAlignment,
			borderColor,
			borderSize,
		},
	} = props;

	return (
		<div {...useBlockProps.save()}>
			<div className="copywriter-testimonial-block">
				<div
					className="testimonial-wrapper"
					style={{ borderColor, borderWidth: borderSize + "px" }}
				>
					<div
						className="testimonial-content"
						style={{ textAlign: descriptionAlignment }}
					>
						<RichText.Content
							tagName="div"
							className="content"
							value={content}
						/>
					</div>

					<div className="testimonial-info">
						{mediaURL && (
							<img
								className="testimonial-image"
								src={mediaURL}
								alt={__("Testimonial Image", "copywriter-blocks")}
							/>
						)}

						<RichText.Content
							style={{ textAlign: descriptionAlignment }}
							tagName="div"
							value={credentials}
							className="credentials"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
