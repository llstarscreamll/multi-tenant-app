@extends ('layouts.app')

@section ('content')

	<div class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-6 col-md-offset-3">
	<div class="panel panel-default">

		<div class="panel-heading">
		    <h1 class="panel-title">Create Company</h1>
		</div>

	    <div class="panel-body">
	  	{!! Form::open(['route' => 'companies.store', 'method' => 'POST', 'id' => 'create-company']) !!}

			<div class="form-group">
				{!! Form::label('company', 'Company') !!}
				{!! Form::text('company', null, ['class' => 'form-control input-sm']) !!}
			</div>
			
			<div class="clearfix"></div>

			<button type="submit" class="btn btn-default">
				<span>Create</span>
			</button>

		{!! Form::close() !!}

	    </div>

	</div>
	</div>

@endsection