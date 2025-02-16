
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
        panel.setAttribute('width', '2.5');
        panel.setAttribute('height', '1.4');
        panel.setAttribute('color', '#334455');
        panel.setAttribute('material', 'opacity', '0.5');

        // Create title text
        const title = document.createElement('a-image');
        title.setAttribute('src', this.data.title);
        title.setAttribute('position', '0 0.5 0.01');
        title.setAttribute('width', '2.2');
        title.setAttribute('height', '0.3');
        el.appendChild(title);

        // Create description text
        const desc = document.createElement('a-image');
        desc.setAttribute('src', this.data.description);
        desc.setAttribute('position', '0 0.08 0.01');
        desc.setAttribute('width', '2.4');
        desc.setAttribute('height', '0.5');
        el.appendChild(desc);

        // Create image
        const img = document.createElement('a-image');
        img.setAttribute('src', this.data.image);
        img.setAttribute('position', '0 -0.45 0.01');
        img.setAttribute('width', '1.0');
        img.setAttribute('height', '0.5');
        el.appendChild(img);

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
