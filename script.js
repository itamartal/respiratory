
AFRAME.registerComponent('floating-panel', {
    schema: {
        title: { type: 'string', default: '' },
        description: { type: 'string', default: '' },
        image: { type: 'string', default: '' }
    },
    init: function () {
        const el = this.el;

        // Create panel background
        const panel = document.createElement('a-plane');
        panel.setAttribute('width', '1.5');
        panel.setAttribute('height', '1.2');
        panel.setAttribute('color', '#334455');
        panel.setAttribute('material', 'opacity', '0.9');

        // Create title text
        const title = document.createElement('a-text');
        title.setAttribute('value', this.data.title);
        title.setAttribute('position', '0 0.4 0.01');
        title.setAttribute('align', 'center');
        title.setAttribute('shader', 'msdf');
        title.setAttribute('font', 'Alef-Regular.json');
        title.setAttribute('width', '1.4');
        title.setAttribute('color', 'white');
        el.appendChild(title);

        // Create description text
        const desc = document.createElement('a-text');
        desc.setAttribute('value', this.data.description);
        desc.setAttribute('position', '0 0 0.01');
        desc.setAttribute('align', 'center');
        desc.setAttribute('width', '1.4');
        desc.setAttribute('shader', 'msdf');
        desc.setAttribute('font', 'Alef-Regular.json');
        desc.setAttribute('color', 'white');
        desc.setAttribute('baseline', 'top');
        el.appendChild(desc);

        // Create image if provided
        if (this.data.image) {
            const img = document.createElement('a-image');
            img.setAttribute('src', this.data.image);
            img.setAttribute('position', '0 -0.3 0.01');
            img.setAttribute('width', '0.8');
            img.setAttribute('height', '0.4');
            el.appendChild(img);
        }

        el.appendChild(panel);                

        // Add floating animation
        el.setAttribute('animation', {
            property: 'position',
            dir: 'alternate',
            dur: 2000,
            easing: 'easeInOutSine',
            loop: true,
            from: el.getAttribute('position').y + ' ' + el.getAttribute('position').x + ' ' + el.getAttribute('position').z,
            to: el.getAttribute('position').y + 0.1 + ' ' + el.getAttribute('position').x + ' ' + el.getAttribute('position').z
        });
    }
});
