import store from "@/store";

const dialogDrag = {
    mounted(el) {
        const dialogHeader = el.querySelector(".deepseek-top-content") || el;
        dialogHeader.style.cursor = "move";
        let isDragging = false;
        let startX = 0;
        let startY = 0;
        let initialLeft = 0;
        let initialTop = 0;

        const onMouseDown = (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            const rect = el.getBoundingClientRect();
            initialLeft = rect.left;
            initialTop = rect.top;
            document.addEventListener("mousemove", onMouseMove);
            document.addEventListener("mouseup", onMouseUp);
        };

        const onMouseMove = (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            el.style.position = "fixed";
            el.style.left = `${initialLeft + dx}px`;
            el.style.top = `${initialTop + dy}px`;
            el.style.margin = "0";
        };

        const onMouseUp = () => {
            isDragging = false;
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };

        dialogHeader.addEventListener("mousedown", onMouseDown);
        el.__dialogDragCleanup__ = () => {
            dialogHeader.removeEventListener("mousedown", onMouseDown);
        };
    },
    unmounted(el) {
        if (el.__dialogDragCleanup__) {
            el.__dialogDragCleanup__();
        }
    },
};

export default {
    install(app) {
        app.directive("dialogDrag", dialogDrag);

        app.directive("compare", {
            updated(el, binding) {
                const { value, oldValue, arg, modifiers } = binding;
            },
            unmounted(el, binding) {},
        });

        app.directive("clickOutside", {
            mounted(el, binding) {
                function clickHandler(e) {
                    if (el.contains(e.target)) {
                        return false;
                    }
                    if (binding.expression) {
                        binding.value(e);
                    }
                }
                el.__vueClickOutside__ = clickHandler;
                document.addEventListener("click", clickHandler);
            },
            updated() {},
            unmounted(el) {
                document.removeEventListener("click", el.__vueClickOutside__);
                delete el.__vueClickOutside__;
            },
        });

        app.directive("btn", {
            mounted(el, binding) {
                store
                    .dispatch("getButtonPermissions")
                    .then((buttonPermissions) => {
                        if (!buttonPermissions.includes(binding.value)) {
                            el.style.display = "none";
                        }
                    });
            },
            updated(el, binding) {
                if (el.style.display === "none") {
                    el.style.display = "inline-block";
                }
                store
                    .dispatch("getButtonPermissions")
                    .then((buttonPermissions) => {
                        if (!buttonPermissions.includes(binding.value)) {
                            el.style.display = "none";
                        }
                    });
            },
        });
    },
};
