use color_eyre::eyre;

fn main() -> eyre::Result<()> {
	color_eyre::install()?;
	catena_cli::run()?;
	Ok(())
}
