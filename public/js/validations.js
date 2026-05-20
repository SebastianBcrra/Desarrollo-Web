const form = document.querySelector('form');

if(form){

    form.addEventListener('submit', (e) => {

        const inputs = form.querySelectorAll('input');

        let valid = true;

        inputs.forEach(input => {

            if(input.value.trim() === ''){

                valid = false;
            }
        });

        if(!valid){

            e.preventDefault();

            alert('Todos los campos son obligatorios');
        }
    });
}