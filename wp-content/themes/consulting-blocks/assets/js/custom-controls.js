(function(api) {

    api.sectionConstructor['consulting-blocks-upsell'] = api.Section.extend({
        attachEvents: function() {},
        isContextuallyActive: function() {
            return true;
        }
    });

    const consulting_blocks_section_lists = ['banner', 'service'];
    consulting_blocks_section_lists.forEach(consulting_blocks_homepage_scroll);

    function consulting_blocks_homepage_scroll(item, index) {
        item = item.replace(/-/g, '_');
        wp.customize.section('consulting_blocks_' + item + '_section', function(section) {
            section.expanded.bind(function(isExpanding) {
                wp.customize.previewer.send(item, { expanded: isExpanding });
            });
        });
    }
})(wp.customize);