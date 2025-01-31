package excel

func (e *Excel) buildHeader() {

	e.file.SetCellValue(sheetName, "A1", "Imagen")
	e.file.MergeCell(sheetName, "A1", "A5")
	e.file.SetColWidth(sheetName, "A", "A", logoWidth)

	e.file.SetCellValue(sheetName, "B1", "SOLICITUD DE MATERIALES / SERVICIOS / EQUIPO")
	e.file.MergeCell(sheetName, "B1", "B5")
	e.file.SetColWidth(sheetName, "B", "B", titleWidth)

	e.file.SetCellValue(sheetName, "C1", "Codigo")
	e.file.SetCellValue(sheetName, "C2", "Cod Extension")
	e.file.SetCellValue(sheetName, "C3", "Version")
	e.file.SetCellValue(sheetName, "C4", "Fecha de Version")
	e.file.SetCellValue(sheetName, "C5", "Depndencia Division")
	e.file.SetColWidth(sheetName, "C", "C", formatWidth)

	e.file.SetCellValue(sheetName, "D1", e.headerFormat.Codigo)
	e.file.SetCellValue(sheetName, "D2", e.headerFormat.CodigoExtension)
	e.file.SetCellValue(sheetName, "D3", e.headerFormat.Version)
	e.file.SetCellValue(sheetName, "D4", e.headerFormat.FechaDeVersion)
	e.file.SetCellValue(sheetName, "D5", e.headerFormat.DepndencyDivision)
	e.file.SetColWidth(sheetName, "D", "D", formatWidth)
}
