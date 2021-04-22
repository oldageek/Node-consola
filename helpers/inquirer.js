const inquire = require('inquirer');
require('colors');

const preguntas = [{
    type: 'list',
    name: 'opcion',
    message: 'Que desea hacer?',
    choices: [{
            value: '1',
            name: `${'1.'.green} Crear tarea`
        },
        {
            value: '2',
            name: `${'2.'.green} Listar tarea`
        },
        {
            value: '3',
            name: `${'3.'.green} Listar tarea completada`
        },
        {
            value: '4',
            name: `${'4.'.green} Listar tarea pendiente`
        },
        {
            value: '5',
            name: `${'5.'.green} Completar tarea(s)`
        },
        {
            value: '6',
            name: `${'6.'.green} Borrar tarea`
        },
        {
            value: '0',
            name: `${'0.'.green} Salir`
        },
    ]
}];

const inquireMenu = async() => {
    console.clear();
    console.log('========================'.green);
    console.log('  Seleccione una opcion  '.white);
    console.log('=========================\n'.green);

    const { opcion } = await inquire.prompt(preguntas);
    return opcion;
}

const pausa = async() => {
    const question = [{
        type: 'input',
        name: 'enter',
        message: `Presione ${'enter'.green} para continuar`
    }]
    console.log('\n');
    await inquire.prompt(question);
}

const leerInput = async(message) => {
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value) {
            if (value.length === 0) {
                return 'Porfavor ingrese un valor';
            }
            return true;
        }
    }];

    const { desc } = await inquire.prompt(question);
    return desc;
}

const listadoTareasBorrar = async(tareas = []) => {

    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    const preguntas = [{
        type: 'list',
        name: 'id',
        message: 'Borrar',
        choices
    }]

    const { id } = await inquire.prompt(preguntas);
    return id;
}

const confirmar = async(message) => {
    const question = [{
        type: 'confirm',
        name: 'ok',
        message
    }];

    const { ok } = await inquire.prompt(question);
    return ok;
}

const mostrarListadoCheckList = async(tareas = []) => {

    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const pregunta = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Selecciones',
        choices
    }]

    const { ids } = await inquire.prompt(pregunta);
    return ids;
}

module.exports = {
    inquireMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
}