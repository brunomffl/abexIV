class Card {
    constructor({ imageUrl, onDismiss, onLike, onDislike }) {
        this.imageUrl = imageUrl;
        this.onDismiss = onDismiss;
        this.onLike = onLike;
        this.onDislike = onDislike;
        this.#init();
    }

    #startPoint;
    #offsetX;
    #element;

    #init() {
        const card = document.createElement("div");
        card.classList.add("card");

        const texto = document.createElement("p");
        texto.innerText = this.imageUrl;
        texto.classList.add("pergunta");
        card.appendChild(texto);

        this.#element = card;
        this.#listenToMouseEvents();
    }

    #listenToMouseEvents() {
        const card = this.#element;

        const gestureZone = card;
        gestureZone.addEventListener("pointerdown", (event) => {
            this.#startPoint = event.clientX;
            gestureZone.setPointerCapture(event.pointerId);
        });

        gestureZone.addEventListener("pointermove", (event) => {
            if (!this.#startPoint) return;
            this.#offsetX = event.clientX - this.#startPoint;
            this.#element.style.transform = `translateX(${this.#offsetX}px) rotate(${this.#offsetX * 0.05}deg)`;
        });

        gestureZone.addEventListener("pointerup", () => {
            this.#startPoint = null;
            this.#element.style.transform = "";

            const decisionMade = Math.abs(this.#offsetX) > 150;
            if (decisionMade) {
                this.#element.remove();
                this.onDismiss();
                if (this.#offsetX > 0) {
                    this.onLike();
                } else {
                    this.onDislike();
                }
            }

        this.#offsetX = 0;
        });
    }

    get element() {
        return this.#element;
    }
}