import React from 'react';
import ConnectedHeader from '@/components/Header/Connected';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import { getAllBlogPosts } from '@/lib/data/blog';

export const revalidate = 0;

export const metadata = {
  title: 'Security Tips | Safety Advice | Licensed Security Guards & Patrols',
  description:
    'Explore expert insights and updates from the Security and Patrol blog on security guard services, mobile patrols, and property protection.',
};

const BLOG_INTRO_HTML = `
		<div data-elementor-type="wp-page" data-elementor-id="8" class="elementor elementor-8" data-elementor-post-type="page">
						<section class="elementor-section elementor-top-section elementor-element elementor-element-eb9a78a elementor-section-stretched elementor-section-content-top elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="eb9a78a" data-element_type="section" data-e-type="section" data-settings="{&quot;stretch_section&quot;:&quot;section-stretched&quot;,&quot;background_background&quot;:&quot;classic&quot;}">
							<div class="elementor-background-overlay"></div>
							<div class="elementor-container elementor-column-gap-default">
					<div class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-5f2fa47" data-id="5f2fa47" data-element_type="column" data-e-type="column">
			<div class="elementor-widget-wrap elementor-element-populated">
						<div class="elementor-element elementor-element-25cfa32 elementor-widget elementor-widget-heading" data-id="25cfa32" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
				<div class="elementor-widget-container">
					<h2 class="elementor-heading-title elementor-size-default"><br> OUR<br>
<span style="color:#ee8e09;font-size:72px">BLOGS</span>

</h2>				</div>
				</div>
				<div class="elementor-element elementor-element-76e8a8a elementor-widget elementor-widget-text-editor" data-id="76e8a8a" data-element_type="widget" data-e-type="widget" data-widget_type="text-editor.default">
				<div class="elementor-widget-container">
									<p>New product features, the latest in technology and updates.</p>								</div>
				</div>
				<div class="elementor-element elementor-element-97fe95c elementor-button-align-stretch elementor-widget elementor-widget-form" data-id="97fe95c" data-element_type="widget" data-e-type="widget" data-settings="{&quot;button_width&quot;:&quot;40&quot;,&quot;step_next_label&quot;:&quot;Next&quot;,&quot;step_previous_label&quot;:&quot;Previous&quot;,&quot;step_type&quot;:&quot;number_text&quot;,&quot;step_icon_shape&quot;:&quot;circle&quot;}" data-widget_type="form.default">
				<div class="elementor-widget-container">
							<form class="elementor-form" method="post" name="New Form" aria-label="New Form">
			<input type="hidden" name="post_id" value="8"/>
			<input type="hidden" name="form_id" value="97fe95c"/>
			<input type="hidden" name="referer_title" value="Security Tips | Safety Advice | Licensed Security Guards &amp; Patrols" />

							<input type="hidden" name="queried_id" value="8"/>
			
			<div class="elementor-form-fields-wrapper elementor-labels-above">
								<div class="elementor-field-type-email elementor-field-group elementor-column elementor-field-group-name elementor-col-60">
													<input size="1" type="email" name="form_fields[name]" id="form-field-name" class="elementor-field elementor-size-sm  elementor-field-textual" placeholder="Enter your email">
											</div>
								<div class="elementor-field-group elementor-column elementor-field-type-submit elementor-col-40 e-form__buttons">
					<button class="elementor-button elementor-size-sm" type="submit">
						<span class="elementor-button-content-wrapper">
																						<span class="elementor-button-text">Subscribe</span>
													</span>
					</button>
				</div>
			</div>
		</form>
						</div>
				</div>
					</div>
		</div>
				<div class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-78d680e" data-id="78d680e" data-element_type="column" data-e-type="column">
			<div class="elementor-widget-wrap">
							</div>
		</div>
					</div>
		</section>
				<section class="elementor-section elementor-top-section elementor-element elementor-element-9cf77c7 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="9cf77c7" data-element_type="section" data-e-type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
						<div class="elementor-container elementor-column-gap-default">
					<div class="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-bff3c7e" data-id="bff3c7e" data-element_type="column" data-e-type="column">
			<div class="elementor-widget-wrap">
							</div>
		</div>
				<div class="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-2fc8fec" data-id="2fc8fec" data-element_type="column" data-e-type="column">
			<div class="elementor-widget-wrap elementor-element-populated">
						<div class="elementor-element elementor-element-6c0e72a elementor-widget elementor-widget-text-editor" data-id="6c0e72a" data-element_type="widget" data-e-type="widget" data-widget_type="text-editor.default">
				<div class="elementor-widget-container">
									<p>Our blogs</p>								</div>
				</div>
				<div class="elementor-element elementor-element-85b4db9 elementor-widget elementor-widget-heading" data-id="85b4db9" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
				<div class="elementor-widget-container">
					<h2 class="elementor-heading-title elementor-size-default">Welcome to the Security and Patrol Security Blog </h2>				</div>
				</div>
					</div>
		</div>
				<div class="elementor-column elementor-col-33 elementor-top-column elementor-element elementor-element-7919b52" data-id="7919b52" data-element_type="column" data-e-type="column">
			<div class="elementor-widget-wrap">
							</div>
		</div>
					</div>
		</section>
	</div>
`;

export default async function AdsBlogPage() {
  const blogData = await getAllBlogPosts();
  const posts = [...blogData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <div id="wrapper" className="site wp-site-blocks">
        <a className="skip-link screen-reader-text scroll-ignore" href="#main">Skip to content</a>
        <ConnectedHeader />
        <div id="content" className="site-content">
          <main id="inner-wrap" className="wrap kt-clear" role="main">
            <div id="primary" className="content-area">
              <div className="content-container site-container">
                <div id="main" className="site-main">
                  <div className="content-wrap">
                    <article id="post-8" className="entry content-bg single-entry post-8 page type-page status-publish hentry">
                      <div className="entry-content-wrap">
                        <div className="entry-content single-content" dangerouslySetInnerHTML={{ __html: BLOG_INTRO_HTML }} />
                        <div className="elementor-element e-flex e-con-boxed e-con e-parent ads-blog-grid-wrap">
                          <div className="e-con-inner">
                            <div className="ekit-wid-con">
                              <div id="post-items" className="ekit-row post-items">
                                {posts.map((post) => (
                                  <BlogCard key={post.id} post={post} />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
