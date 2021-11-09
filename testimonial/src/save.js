/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
import { RichText, useBlockProps } from "@wordpress/block-editor";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
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
      <div
        className="testimonial-wrapper"
        style={{ border: `${borderSize}px solid ${borderColor}` }}
      >
        <div
          className="testimonial-content"
          style={{ textAlign: descriptionAlignment }}
        >
          <RichText.Content tagName="div" className="content" value={content} />
        </div>

        <div className="testimonial-info">
          {mediaURL && (
            <img
              className="testimonial-image"
              src={mediaURL}
              alt={__("Testimonial Image", "testimonial")}
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
  );
}
