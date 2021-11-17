import { __ } from "@wordpress/i18n";
import { RichText, useBlockProps } from "@wordpress/block-editor";

export default function save(props) {
	const {
		attributes: {
			backgroundColor,
			content,
			buttonText,
			buttonURL,
			contentAlignment,
			borderColor,
			borderSize,
			buttonBackgroundColor,
			buttonTextColor,
			buttonShape,
			buttonSize,
		},
	} = props;

	return (
		<div
			{...useBlockProps.save()}
			style={{
				backgroundColor,
				border: borderSize + "px" + " solid" + " " + borderColor,
			}}
		>
			<div
				className="copywriter-cta__container"
				style={{ textAlign: contentAlignment }}
			>
				{content && (
					<RichText.Content
						tagName="div"
						className="cta__content"
						value={content}
					/>
				)}
				<div className="cta__button">
					{buttonText && (
						<a
							href={buttonURL}
							className={`button ${buttonShape} ${buttonSize}`}
							style={{
								color: buttonTextColor,
								backgroundColor: buttonBackgroundColor,
							}}
						>
							<RichText.Content value={buttonText} />
						</a>
					)}
				</div>
			</div>
		</div>
	);
}
