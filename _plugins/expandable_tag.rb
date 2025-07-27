# _plugins/expandable_tag.rb
module Jekyll

    class ExpandableTag < Liquid::Block

      def assign_ids_to_headings(input)
        require 'nokogiri'
        doc = Nokogiri::HTML::DocumentFragment.parse(input)
        doc.css('h1, h2, h3, h4, h5, h6').each do |heading|
            id = heading.content.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
            if heading['id'].start_with?("id_")
                heading['id'] = "#{id}_#{generate_random_id}"
            end
            #puts heading['keep_id']
        end
        return doc
      end

  
      def initialize(tag_name, markup, tokens)
        super
        # Parse named arguments
        @args = {}

        # Regex to match key-value arguments:
        markup.scan(/(\w+)=["']([^"']+)["']|\b(\w+)=([^\s]+)/).each do |matches|
            key = matches[0] || matches[2]
            value = matches[1] || matches[3]
            @args[key] = value
        end

      end

      def generate_random_id(length = 8)
        characters = ('a'..'z').to_a + ('A'..'Z').to_a + (0..9).to_a
        Array.new(length) { characters.sample }.join
      end
  
      def render(context)

        # Capture the content between the custom tags
        content = super

        # Set properties
        is_expanded = @args['expanded'] == "true" ? true : false
        level = @args['level'] || 2
        title = @args['title'] || "Section"
        id = @args['id']
        display = is_expanded ? "display: block;" : "display: none;"
        icon = is_expanded ? "<i class='fa-solid fa-angle-down'></i>" : "<i class='fa-solid fa-angle-right'></i>"
  
        # Get the Markdown converter from Jekyll's site context
        converter = context.registers[:site].find_converter_instance(Jekyll::Converters::Markdown)

        # Convert the captured content from Markdown to HTML
        rendered_content = converter.convert(content.strip)

        # Assign ids to all headings
        rendered_content = assign_ids_to_headings(rendered_content)

        # Generate target id:
        target = "panel_#{generate_random_id}"
        header_id = id || "heading_#{generate_random_id}"

        # Wrap the content in a div with a button for expand/collapse functionality
        # Escape the HTML output to prevent Liquid from rendering it as code
        return "<div class='expandable-section'>
            <div class='toggle-header'>
                <button class='toggle-button' 
                    target-panel='##{target}'
                    onclick='toggleExpandable(this)'
                    >#{icon}</button>
                <h#{level} 
                    id=\"#{header_id}\"
                    target-panel=\"##{target}\"
                    onclick=\"toggleExpandable(this)\"
                    style=\"cursor: pointer;\">#{title}</h#{level}>
            </div>
            <div class='expandable-content' 
                style='#{display}'
                id='#{target}'
                >#{rendered_content}</div>
        </div>"
      end
    end
  end
  
  Liquid::Template.register_tag('expandable', Jekyll::ExpandableTag)
