from flask import Blueprint, request, jsonify, session
from backend.database import get_connection

perfil_bp = Blueprint('perfil_academico', __name__)

@perfil_bp.route('/api/perfil-academico', methods=['POST'])
def guardar_perfil():
    data = request.get_json()
    institucion_id = session.get('institucion_id')
    
    if not institucion_id:
        return jsonify({'error': 'No hay institución en sesión'}), 400
    
    nombre_completo = data.get('nombreCompleto')
    disponibilidad = data.get('disponibilidad')
    nombre_carrera = data.get('nombreCarrera')
    nivel = data.get('nivel')
    promedio = data.get('promedio')
    tipo_periodo = data.get('tipoPeriodo')
    numero_periodo = data.get('numeroPeriodo')
    
    disponibilidad_val = 1 if disponibilidad == 'disponible' else 0
    
    connection = get_connection()
    cursor = connection.cursor()
    
    try:
        # Buscar carrera o crear
        query_buscar = """
            SELECT carrera_id FROM carreras
            WHERE nombre = %s AND nivel = %s AND id_institucion = %s
        """
        values_buscar = (nombre_carrera, nivel, institucion_id)
        
        cursor.execute(query_buscar, values_buscar)
        carrera = cursor.fetchone()
        
        if carrera:
            id_carrera = carrera[0]
        else:
            query_crear = """
                INSERT INTO carreras (nombre, nivel, id_institucion)
                VALUES (%s, %s, %s)
            """
            values_crear = (nombre_carrera, nivel, institucion_id)
            
            cursor.execute(query_crear, values_crear)
            id_carrera = cursor.lastrowid
            
        # Insertar estudiante
        query_estudiante = """
            INSERT INTO estudiantes (
                nombre, promedio,
                tipo_periodo, periodo_numero,
                disponibilidad, id_carrera
            ) VALUES (%s, %s, %s, %s, %s, %s)
        """
        values_estudiante = (nombre_completo, promedio, tipo_periodo,
                             numero_periodo, disponibilidad_val, id_carrera)
        
        cursor.execute(query_estudiante, values_estudiante)
        alumno_id = cursor.lastrowid
        
        session['alumno_id'] = alumno_id
        connection.commit()
        
        return jsonify({'message': 'Perfil académico guardado'}), 201
        
    except Exception as ex:
        connection.rollback()
        return jsonify({'error': str(ex)}), 500
    
    finally:
        cursor.close()
        connection.close()
        

@perfil_bp.route('/api/portafolio', methods=['POST'])
def guardar_portafolio():
    alumno_id = session.get('alumno_id')
    
    if not alumno_id:
        return jsonify({'error': 'No hay alumno en sesión'}), 400
    
    data = request.get_json()
    url_portafolio = data.get('urlPortafolio')
    
    connection = get_connection()
    cursor = connection.cursor()
    
    try:
        query_portafolio = """
            UPDATE estudiantes
            SET portafolio_url = %s
            WHERE alumno_id = %s
        """
        values_portafolio = (url_portafolio, alumno_id)
        
        cursor.execute(query_portafolio, values_portafolio)
        connection.commit()
        
        return jsonify({'message': 'Portafolio guardado correctamente'}), 200
    
    except Exception as ex:
        connection.rollback()
        return jsonify({'error': str(ex)}), 500
    
    finally:
        cursor.close()
        connection.close()