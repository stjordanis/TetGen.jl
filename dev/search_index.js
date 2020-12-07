var documenterSearchIndex = {"docs":
[{"location":"#TetGen.jl","page":"Home","title":"TetGen.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"TetGen  is a  mesh generator  written in  C++.  It  generates Delaunay tetrahedralizations,  constrained  Delaunay  tetrahedralizations,  and quality tetrahedral  meshes. TetGen.jl  provides a Julia  interface to TetGen.","category":"page"},{"location":"#Mesh-based-API","page":"Home","title":"Mesh based API","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"This API uses instances of types from GeometryBasics.jl  to describe input and output of TetGen.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Modules = [TetGen]\nPages = [\"api.jl\"]","category":"page"},{"location":"#TetGen.tetrahedralize","page":"Home","title":"TetGen.tetrahedralize","text":"tetrahedralize(mesh)\ntetrahedralize(mesh, command)\n\n\nTetrahedralize a domain described by a mesh of triangles. Returns a mesh of tetrahdra.\n\n\n\n\n\n","category":"function"},{"location":"#TetGen.tetrahedralize-2","page":"Home","title":"TetGen.tetrahedralize","text":"tetrahedralize(mesh)\ntetrahedralize(mesh, command; marker)\n\n\nTetrahedralize a mesh of polygons with optional facet markers. Returns a mesh of tetrahdra.\n\n\n\n\n\n","category":"function"},{"location":"#TetGen.voronoi-Union{Tuple{Array{GeometryBasics.Point{3,T},1}}, Tuple{T}} where T<:AbstractFloat","page":"Home","title":"TetGen.voronoi","text":"voronoi(points)\n\n\nCreate voronoi diagram of point set.    \n\nReturns a mesh of triangles.\n\n\n\n\n\n","category":"method"},{"location":"#Raw-API","page":"Home","title":"Raw API","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"This API is closer to TetGen's C++ API in the sense that input and output are described using arrays of integers and floats, without conversion to any other higher level data structure.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Modules = [TetGen]\nPages = [ \"rawtetgenio.jl\"]","category":"page"},{"location":"#TetGen.RawFacet","page":"Home","title":"TetGen.RawFacet","text":"struct RawFacet{T}\n\nA complex facet as part to the input to TetGen.\n\npolygonlist::Array{Array{Int32,1},1}\nPolygons given as arrays of indices which point into the pointlist array describing the input points.\n\nholelist::Array{T,2} where T\nArray of points given by their coordinates marking polygons describing holes in the facet.\n\n\n\n\n\n","category":"type"},{"location":"#TetGen.RawTetGenIO","page":"Home","title":"TetGen.RawTetGenIO","text":"mutable struct RawTetGenIO{T}\n\nA  structure for  transferring  data  into and  out  of TetGen's internal representation.\n\nThe input of TetGen is either a 3D point set, or a 3D piecewise linear complex (PLC), or  a tetrahedral mesh.  Depending on  the input object and the specified  options, the output of TetGen is  either a Delaunay (or weighted Delaunay) tetrahedralization, or a constrained (Delaunay) tetrahedralization, or a quality tetrahedral mesh.\n\nA piecewise  linear complex  (PLC) represents  a 3D  polyhedral domain with  possibly internal  boundaries(subdomains). It  is introduced  in [Miller  et al,  1996].   Basically  it is  a  set  of \"cells\",  i.e., vertices, edges, polygons, and polyhedra,  and the intersection of any two of its cells is the union of other cells of it.\n\nThe 'RawTetGenIO' structure  is a collection of arrays  of data, i.e., points, facets, tetrahedra,  and so forth. All data  are compatible to the representation in C++ and can be used without copying.\n\npointlist::Array{T,2} where T\n'pointlist':  Array of point coordinates with size(pointlist,1)==3.\n\npointattributelist::Array{T,2} where T\n'pointattributelist':  Array of point attributes. The number of  attributes per point is determined by  size(pointattributelist,1)\n\npointmtrlist::Array{T,2} where T\n'pointmtrlist': An array of metric tensors at points.\n\npointmarkerlist::Array{Int32,1}\n'pointmarkerlist':  An array of point markers; one integer per point.\n\ntetrahedronlist::Array{Int32,2}\n'tetrahedronlist': An array of tetrahedron corners represented by indices of points in pointlist. Unless option -o2 is given, one has  size(tetrahedronlist,1)==4, i.e. each  column describes the    four     corners    of    a     tetrahedron.     Otherwise, size(tetrahedronlist,1)==10 and the 4  corners are followed by 6 edge midpoints.\n\ntetrahedronattributelist::Array{T,2} where T\n'tetrahedronattributelist':  An array of tetrahedron attributes.\n\ntetrahedronvolumelist::Array{T,1} where T\n'tetrahedronvolumelist':  An array of constraints, i.e. tetrahedron's  volume;  Input only. This can be used for triggering local refinement.\n\nneighborlist::Array{Int32,2}\n'neighborlist':  An array of tetrahedron neighbors; 4 ints per element.  Output only.\n\nfacetlist::Array{RawFacet{T},1} where T\n'facetlist':  An array of facets.  Each entry is a structure of facet.\n\nfacetmarkerlist::Array{Int32,1}\n'facetmarkerlist':  An array of facet markers; one int per facet.\n\nholelist::Array{T,2} where T\n'holelist':  An array of holes (in volume).  Each hole is given by a  point which lies strictly inside it.\n\nregionlist::Array{T,2} where T\n'regionlist': An array of regions (subdomains).  Each region is given by  a seed (point) which lies strictly inside it. For each column,  the point coordinates ade  at indices [1], [2] and [3], followed by the regional  attribute at index [4], followed by the maximum volume at index [5].\note that each regional attribute is used only if you select the 'A'  switch, and each volume constraint is used only if you select the  'a' switch (with no number following).\n\nfacetconstraintlist::Array{T,2} where T\n'facetconstraintlist':  An array of facet constraints.  Each constraint specifies a maximum area bound on the subfaces of that facet.  Each column contains  a facet marker at index [1] and its maximum area bound at index [2]. Note: the facet marker is actually an integer.\n\nsegmentconstraintlist::Array{T,2} where T\n'segmentconstraintlist': An array of segment constraints. Each constraint specifies a maximum length bound on the subsegments of that segment. Each columb consists of the  two endpoints of the segment at index [1] and [2], and the maximum length bound at index [3]. Note the segment endpoints are actually integers.\n\ntrifacelist::Array{Int32,2}\n'trifacelist':  An array of face (triangle) corners.\n\ntrifacemarkerlist::Array{Int32,1}\n'trifacemarkerlist':  An array of face markers; one int per face.\n\nedgelist::Array{Int32,2}\n'edgelist':  An array of edge endpoints.\n\nedgemarkerlist::Array{Int32,N} where N\n'edgemarkerlist':  An array of edge markers.\n\n\n\n\n\n","category":"type"},{"location":"#TetGen.RawTetGenIO-Union{Tuple{}, Tuple{T}} where T","page":"Home","title":"TetGen.RawTetGenIO","text":"Create RawTetGenIO structure with empty data.\n\n\n\n\n\n","category":"method"},{"location":"#TetGen.facetlist!-Union{Tuple{T}, Tuple{RawTetGenIO{T},AbstractArray{T,2} where T}} where T","page":"Home","title":"TetGen.facetlist!","text":"facetlist!(tio::RawTetGenIO{T}, facets::AbstractArray{T,2} where T) -> RawTetGenIO{T}\n\n\nSet list of input facets from AbstractMatrix desribing polygons of the same\nsize (e.g. triangles)\n\n\n\n\n\n","category":"method"},{"location":"#TetGen.facetlist!-Union{Tuple{T}, Tuple{RawTetGenIO{T},Array{T,1} where T}} where T","page":"Home","title":"TetGen.facetlist!","text":"facetlist!(tio::RawTetGenIO{T}, facets::Array{T,1} where T) -> RawTetGenIO{T}\n\n\nSet list of input facets from a vector of polygons of different size\n\n\n\n\n\n","category":"method"},{"location":"#TetGen.numberofedges-Union{Tuple{RawTetGenIO{T}}, Tuple{T}} where T","page":"Home","title":"TetGen.numberofedges","text":"Number of edges in tetrahedralization\n\n\n\n\n\n","category":"method"},{"location":"#TetGen.numberofpoints-Union{Tuple{RawTetGenIO{T}}, Tuple{T}} where T","page":"Home","title":"TetGen.numberofpoints","text":"numberofpoints(tio::RawTetGenIO{T}) -> Int64\n\n\nNumber of points in tetrahedralization\n\n\n\n\n\n","category":"method"},{"location":"#TetGen.numberoftetrahedra-Union{Tuple{RawTetGenIO{T}}, Tuple{T}} where T","page":"Home","title":"TetGen.numberoftetrahedra","text":"Number of tetrahedra in tetrahedralization\n\n\n\n\n\n","category":"method"},{"location":"#TetGen.numberoftrifaces-Union{Tuple{RawTetGenIO{T}}, Tuple{T}} where T","page":"Home","title":"TetGen.numberoftrifaces","text":"Number of triangle faces in tetrahedralization\n\n\n\n\n\n","category":"method"},{"location":"#TetGen.surfacemesh-Tuple{RawTetGenIO}","page":"Home","title":"TetGen.surfacemesh","text":"surfacemesh(tgio::RawTetGenIO) -> GeometryBasics.Mesh\n\n\nCreate GeometryBasics.Mesh from the triface list (for quick visualization purposes using Makie's wireframe).\n\n\n\n\n\n","category":"method"},{"location":"#TetGen.tetrahedralize-Tuple{RawTetGenIO{Float64},String}","page":"Home","title":"TetGen.tetrahedralize","text":"tetrahedralize(input::RawTetGenIO{Float64}, flags::String) -> RawTetGenIO{Float64}\n\n\nTetrahedralize input.\n\n  flags: -pYrq_Aa_miO_S_T_XMwcdzfenvgkJBNEFICQVh \n    -p  Tetrahedralizes a piecewise linear complex (PLC).\n    -Y  Preserves the input surface mesh (does not modify it).\n    -r  Reconstructs a previously generated mesh.\n    -q  Refines mesh (to improve mesh quality).\n    -R  Mesh coarsening (to reduce the mesh elements).\n    -A  Assigns attributes to tetrahedra in different regions.\n    -a  Applies a maximum tetrahedron volume constraint.\n    -m  Applies a mesh sizing function.\n    -i  Inserts a list of additional points.\n    -O  Specifies the level of mesh optimization.\n    -S  Specifies maximum number of added points.\n    -T  Sets a tolerance for coplanar test (default 1e-8).\n    -X  Suppresses use of exact arithmetic.\n    -M  No merge of coplanar facets or very close vertices.\n    -w  Generates weighted Delaunay (regular) triangulation.\n    -c  Retains the convex hull of the PLC.\n    -d  Detects self-intersections of facets of the PLC.\n    -z  Numbers all output items starting from zero.\n    -f  Outputs all faces to .face file.\n    -e  Outputs all edges to .edge file.\n    -n  Outputs tetrahedra neighbors to .neigh file.\n    -v  Outputs Voronoi diagram to files.\n    -g  Outputs mesh to .mesh file for viewing by Medit.\n    -k  Outputs mesh to .vtk file for viewing by Paraview.\n    -J  No jettison of unused vertices from output .node file.\n    -B  Suppresses output of boundary information.\n    -N  Suppresses output of .node file.\n    -E  Suppresses output of .ele file.\n    -F  Suppresses output of .face and .edge file.\n    -I  Suppresses mesh iteration numbers.\n    -C  Checks the consistency of the final mesh.\n    -Q  Quiet:  No terminal output except errors.\n    -V  Verbose:  Detailed information, more terminal output.\n    -h  Help:  A brief instruction for using TetGen.\n\n\n\n\n\n","category":"method"},{"location":"#TetGen.volumemesh-Tuple{RawTetGenIO}","page":"Home","title":"TetGen.volumemesh","text":"volumemesh(tgio::RawTetGenIO) -> GeometryBasics.Mesh\n\n\nCreate GeometryBasics.Mesh of all tetrahedron faces (for quick visualization purposes using Makie's wireframe).\n\n\n\n\n\n","category":"method"},{"location":"#TetGen-C-code","page":"Home","title":"TetGen C++ code","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Technical report (html version).\nH.Si, \"TetGen, a Delaunay-Based Quality Tetrahedral Mesh Generator\" ACM Trans. Math. Software, 41 (2015) pp. 11:1–11:36. Please consider citing this paper when publishing results obtained with the use of TetGen. Link to preprint  here. ","category":"page"}]
}
