from flask import Blueprint, request, jsonify, session
from backend.database import get_connection

instituciones_bp = Blueprint('instituciones', __name__)

# RUTA DE INSTITUCIONES
@instituciones_bp.route('/api/instituciones', methods=['POST'])
def crear_institucion():
    data = request.get_json()
    
    nombre_institucion = data.get('nombreInstitucion')
    cct = data.get('cct')
    correo = data.get('correo')
    telefono = data.get('telefono')
    ciudad = data.get('ciudad')
    estado = data.get('estado')
    
    connection = get_connection()
    
    if connection is None:
        return jsonify({'error': 'Error en la conexión con la base de datos'}), 500
    try:
        cursor = connection.cursor()
        query = """
            INSERT INTO instituciones
            (nombre, cct, email, telefono, ciudad, estado)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        
        values = (nombre_institucion, cct, correo, telefono, ciudad, estado)
        
        cursor.execute(query, values)
        connection.commit()
        
        institucion_id = cursor.lastrowid
        session['institucion_id'] = institucion_id
        
        return jsonify({
            'message': 'Institución creada correctamente',
            'id': institucion_id
            }), 201
        
    except Exception as ex:
        print('Error en la inserción: ', ex)
        return jsonify({'error': 'Ocurrió un error tratando de insertar la información'}), 500
    
    finally:
        cursor.close()
        connection.close()