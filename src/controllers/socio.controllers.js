import { json } from "express"
import { pool } from "../db.js"

export const getSocios=async(req,res)=>{
try {
    const [rows] = await pool.query('select Nombre, Apellido, Celular from socioprueba WHERE LENGTH(Celular)>0')
    res.json(rows)
} catch (error) {
    return res.status(500).json({
        message:"Something goes wrong"
    })
}
}

export const getSocio=async(req,res)=>{
    console.log(req.params.id)
    const [rows]= await pool.query('select Nombre,Apellido, Celular from socioprueba WHERE LENGTH(Celular)>0 AND IdUsuario=?',[req.params.id])
    if(rows.length<=0){
        return res.status(404).json({
            message:'Socio no encontrado'
        })
    }

    console.log(rows)
    res.json(rows[0])
}

export const createSocio=async (req,res)=>{

    const {CodigoSocio,Nombre,Apellido,TipoDocumento,
        DNI,Celular,Clave,Tarjeta,Activo,Reestablecer,
        FechaIngreso,HoraIngreso,idColaborador}=req.body

        const [rows]= await pool.query('CALL sp_ingresarSocio(?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [CodigoSocio,Nombre,Apellido,TipoDocumento,DNI,Celular,Clave,
            Tarjeta,Activo,Reestablecer,FechaIngreso,HoraIngreso,
            idColaborador])

    res.send({
        id: rows.insertId,
        CodigoSocio,
        Nombre,
        Apellido
    })
}

export const updateSocio=async(req,res)=>{
    const {id}=req.params
    const {CodigoSocio,Nombre,Apellido,TipoDocumento,
        DNI,Celular}=req.body
    
    const [result]= await pool.query('UPDATE socioprueba SET CodigoSocio= IFNULL(?,CodigoSocio),Nombre=IFNULL(?,Nombre),Apellido=IFNULL(?,Apellido),TipoDocumento=IFNULL(?,TipoDocumento),DNI=IFNULL(?,DNI),Celular=IFNULL(?,Celular) WHERE IdUsuario=?',
    [CodigoSocio,Nombre,Apellido,TipoDocumento,DNI,Celular,id])

    if(result.affectedRows===0)return res.status(404),json({
        message:'Socio no encontrado'
    })
    const [rows] = await pool.query('SELECT * FROM socioprueba WHERE IdUsuario=?',[id])

    res.json(rows[0])
}

export const deleteSocio= async (req,res)=>{
    console.log(req.params.id)
    const [result]=await pool.query('DELETE FROM socioprueba WHERE IdUsuario=?',[req.params.id])
    if(result.affectedRows<=0)return res.status(404).json({
        message:'socio no encontrado'
    })
    res.sendStatus(204)
}