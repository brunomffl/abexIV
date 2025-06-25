
class Card {
    constructor({ imageUrl, onDismiss, onLike, onDislike }) {
        this.onDismiss = onDismiss;
        this.onLike = onLike;
        this.onDislike = onDislike;
        this.element = this.#createCardElement(imageUrl);
        this.#listenToMouseEvents();
    }

    #createCardElement = (text) => {
        const card = document.createElement('div');
        card.classList.add('card');
        const p = document.createElement('p');
        p.classList.add('pergunta');
        p.innerHTML = text.replace(/\n/g, '<br>');
        card.appendChild(p);
        return card;
    }

    #listenToMouseEvents = () => {
        let startX = 0;
        
        const onMouseDown = (e) => {
            startX = e.clientX;
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };

        const onMouseMove = (e) => {
            if (e.buttons === 0) {
                onMouseUp(e);
                return;
            }
            const currentX = e.clientX;
            const diffX = currentX - startX;
            this.element.style.transform = `translateX(${diffX}px) rotate(${diffX * 0.1}deg)`;
        };

        const onMouseUp = (e) => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            
            const endX = e.clientX;
            const diffX = endX - startX;

            if (Math.abs(diffX) > 100) { // Limite para o swipe
                this.element.classList.add('dismissing');
                this.element.style.transform = `translateX(${diffX > 0 ? 500 : -500}px) rotate(${diffX > 0 ? 20 : -20}deg)`;
                
                if (diffX > 0) {
                    this.onLike();
                } else {
                    this.onDislike();
                }
                
                setTimeout(() => {
                    this.onDismiss();
                    this.element.remove();
                }, 300);

            } else {
                this.element.style.transition = 'transform 0.3s';
                this.element.style.transform = '';
                setTimeout(() => {
                    this.element.style.transition = '';
                }, 300);
            }
        };
        
        this.element.addEventListener('mousedown', onMouseDown);
    }
}